import React, { useEffect, useRef } from 'react';
import { arrayOf, bool, func } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { CHARACTERS } from '../../../setup/characters';
import { getCharacterColor, updatePlayerObject } from '../../../utils/players';
import { characterCanOpenDoors } from '../../../utils/items';
import { useStateWithLabel } from '../../../utils/hooks';
import ItemsSelectorModal from '../../Items/ItemsSelectorModal';
import ActionButton from './actions';
import ItemsArea from '../../Items/ItemWrapper';
import Blood from '../../../assets/images/blood.png';
import Exit from '../../../assets/images/exit.png';
import {
  ActionsWrapper,
  CharItems,
  CharName,
  CharacterOverlay,
  CharacterSheet,
  ExitSign,
  NextButton,
  PlayerTag,
  PreviousButton,
  SelectButton,
  WoundedSign,
  KilledSign
} from './styles';
import { characterTypes } from '../../../interfaces/types';
import { SOUNDS_PATH } from '../../../setup/endpoints';

const PlayersSection = ({
  damageMode,
  initialCharacters,
  loadGame,
  loadedGame,
  toggleDamageMode
}) => {
  const [character, changeCharacter] = useStateWithLabel({}, 'character');
  const [charIndex, changeCharIndex] = useStateWithLabel(0, 'charIndex');
  const [selectCharOverlay, toggleSelectCharOverlay] = useStateWithLabel(
    false,
    'selectCharOverlay'
  );
  const [inHand, updateInHand] = useStateWithLabel(['', ''], 'inHand');
  const [inBackpack, updateInBackpack] = useStateWithLabel(
    ['', '', ''],
    'inBackpack'
  );

  const [slot, selectSlot] = useStateWithLabel(null, 'slot');
  const [characters, updateCharacters] = useStateWithLabel([], 'characters');
  const [dataLoaded, setDataLoaded] = useStateWithLabel(false, 'dataLoaded');
  const [canOpenDoor, setCanOpenDoor] = useStateWithLabel(false, 'canOpenDoor');

  const [car, startCar] = useStateWithLabel(false, 'car');

  const history = useHistory();

  const prevCharIndex = useRef();
  const prevInHand = useRef();
  const prevInBackpack = useRef();

  const enterCar = enter => {
    const updatedCharacter = { ...character };
    const updatedCharacters = [...characters];
    if (enter) {
      updatedCharacter.location = 'car';
    } else {
      updatedCharacter.location = null;
    }
    console.log('$$$ updatedCharacter', updatedCharacter);
    updatedCharacters.forEach(char => {
      if (char.name === updatedCharacter.name) {
        // eslint-disable-next-line no-param-reassign
        char.location = updatedCharacter.location;
      }
    });
    changeCharacter(updatedCharacter);
    updateCharacters(updatedCharacters);
  };

  const changeInHand = (name, currentSlot = slot - 1) => {
    const newItems = [...inHand];
    const openDoors = characterCanOpenDoors(newItems);
    newItems[currentSlot] = name;
    updateInHand(newItems);
    setCanOpenDoor(openDoors);
    selectSlot();
  };

  const changeInBackpack = (name, currentSlot = slot - 3) => {
    const newItems = [...inBackpack];
    const openDoors = characterCanOpenDoors(newItems);

    newItems[currentSlot] = name;
    updateInBackpack(newItems);
    setCanOpenDoor(openDoors);
    selectSlot();
  };

  const changeToNextPlayer = () => {
    const remainingCharacters = characters.filter(
      char => char.wounded !== 'killed'
    );
    const nextPlayerIndex =
      charIndex + 1 >= remainingCharacters.length ? 0 : charIndex + 1;
    updateCharacters(remainingCharacters);
    changeCharIndex(nextPlayerIndex);
  };

  const changeToPreviousPlayer = () => {
    const remainingCharacters = characters.filter(
      char => char.wounded !== 'killed'
    );
    const nextPlayerIndex =
      charIndex - 1 < 0 ? remainingCharacters.length - 1 : charIndex - 1;
    updateCharacters(remainingCharacters);
    setTimeout(() => changeCharIndex(nextPlayerIndex), 2000);
  };

  const causeDamage = selectedSlot => {
    const woundedCharacter = { ...character };
    const updatedCharacters = [...characters];
    const [attacker, oneActionKill] = damageMode.split('-');

    let damage = 'hit';

    if (woundedCharacter.wounded || oneActionKill) {
      const remainingCharacters = characters.filter(
        char => char.name !== woundedCharacter.name
      );
      updatedCharacters.forEach(char => {
        if (char.name === woundedCharacter.name) {
          char.wounded = 'killed'; // eslint-disable-line no-param-reassign
        }
      });
      woundedCharacter.wounded = 'killed';
      damage = 'kill';
      console.log('$$$ remainingCharacters', remainingCharacters);
      if (remainingCharacters.length === 0) {
        updateCharacters(remainingCharacters);
      } else {
        updateCharacters(updatedCharacters);
      }
    } else if (selectedSlot <= 2) {
      changeInHand('Wounded', selectedSlot - 1);
      woundedCharacter.wounded = true;
    } else {
      changeInBackpack('Wounded', selectedSlot - 3);
      woundedCharacter.wounded = true;
    }

    const filename = `${SOUNDS_PATH}/attacks/${
      character.voice
    }-${damage}-${attacker.toLowerCase()}.mp3`;
    const sound = new Audio(filename);
    sound.currentTime = 0;
    sound.play();
    changeCharacter(woundedCharacter);
    toggleDamageMode(false);
    localStorage.setItem('ZombicideParty', JSON.stringify(updatedCharacters));
  };

  const selectCharacter = () => {
    toggleSelectCharOverlay(false);
    return character;
  };

  const allSlotsAreEmpty = () =>
    inHand.every(item => !item) && inBackpack.every(item => !item);

  const exitGame = () => {
    localStorage.removeItem('ZombicideParty');
    loadGame();
    history.push('/');
  };

  useEffect(() => {
    if (!dataLoaded) {
      const updatedCharacters = (initialCharacters.length > 0 && [
        ...initialCharacters
      ]) ||
        (loadedGame && [...loadedGame]) || [...CHARACTERS];
      updatedCharacters.forEach(char => {
        // Keeps initial items on the right side of the card, for viewing purposes (makes the character image completely seen on the begining)
        const inHandItems = char.inHand.filter(item => item);
        const inBackpackItems = char.inBackpack.filter(item => item);

        if (inHandItems.length === 0) {
          char.inHand = [null, null]; // eslint-disable-line no-param-reassign
        } else if (inHandItems.length === 1) {
          char.inHand = [null, ...char.inHand]; // eslint-disable-line no-param-reassign
        }
        if (inBackpackItems.length === 0) {
          char.inBackpack = [null, null, null]; // eslint-disable-line no-param-reassign
        } else if (inBackpackItems.length === 1) {
          char.inBackpack = [null, null, ...inBackpackItems]; // eslint-disable-line no-param-reassign
        } else if (inBackpackItems.length === 2) {
          char.inBackpack = [null, ...inBackpackItems]; // eslint-disable-line no-param-reassign
        }
      });
      updateCharacters(updatedCharacters);
      prevCharIndex.current = charIndex;
    }
  }, [charIndex, dataLoaded, initialCharacters, loadedGame]);

  useEffect(() => {
    if (characters) {
      const nextChar = characters[charIndex];
      if (
        nextChar &&
        (charIndex !== prevCharIndex.current ||
          !dataLoaded ||
          nextChar.name !== character.name)
      ) {
        const charInHand = [nextChar.inHand[0], nextChar.inHand[1]];
        const charInBackpack = [
          nextChar.inBackpack[0],
          nextChar.inBackpack[1],
          nextChar.inBackpack[2]
        ];
        const openDoors =
          characterCanOpenDoors(charInHand) ||
          characterCanOpenDoors(charInBackpack);

        changeCharacter(nextChar);
        updateInHand(charInHand);
        updateInBackpack(charInBackpack);
        setCanOpenDoor(openDoors);

        prevCharIndex.current = charIndex;
        prevInHand.current = nextChar.inHand.join('-');
        prevInBackpack.current = nextChar.inBackpack.join('-');

        if (!dataLoaded) {
          setDataLoaded(true);
          prevInHand.current = inHand.join('-');
          prevInBackpack.current = inBackpack.join('-');
        }
      }
    }
  }, [charIndex, characters, dataLoaded, inHand]);

  useEffect(() => {
    if (
      dataLoaded &&
      (inHand.join('-') !== prevInHand.current ||
        inBackpack.join('-') !== prevInBackpack.current)
    ) {
      const allCharacters = [...characters];
      const currentCharacter = updatePlayerObject(
        character,
        inHand,
        inBackpack
      );
      const openDoors =
        characterCanOpenDoors(inHand) || characterCanOpenDoors(inBackpack);

      setCanOpenDoor(openDoors);
      allCharacters[charIndex] = currentCharacter;
      updateCharacters(allCharacters);
      localStorage.setItem('ZombicideParty', JSON.stringify(allCharacters));
    }
  }, [inHand, inBackpack]);

  console.log('$$$ character.movement', character.movement);
  return (
    <CharacterSheet>
      <CharacterOverlay damageMode={damageMode} img={character.img} />
      <CharName>{character.name}</CharName>
      <PlayerTag color={getCharacterColor(character.name)}>
        {character.player}
      </PlayerTag>
      <ActionsWrapper>
        <ActionButton
          actionType={
            // eslint-disable-next-line no-nested-ternary
            character.location === 'car' ? 'car-exit' : 'car-enter'
          }
          car={car}
          enterCar={enterCar}
          startCar={startCar}
          type={character.location !== 'car' && !car && 'start'}
        />
        {character.location === 'car' ? (
          <ActionButton actionType="car-move" />
        ) : (
          <ActionButton actionType="move" type={character.movement} />
        )}
        <ActionButton actionType="search" type={character.voice} />
        {canOpenDoor && !damageMode && (
          <ActionButton actionType="open-door" type={canOpenDoor} />
        )}
      </ActionsWrapper>
      {character.wounded && <WoundedSign src={Blood} />}
      {character.wounded === 'killed' && (
        <>
          <KilledSign>
            {!characters || characters.length === 0
              ? 'All characters are dead'
              : `${character.name} has been killed`}
          </KilledSign>
          {characters.length === 0 && (
            <ExitSign onClick={exitGame} src={Exit} />
          )}
        </>
      )}
      <CharItems slotType="inHand">
        {inHand.map((item, index) => (
          <ItemsArea
            allSlotsAreEmpty={allSlotsAreEmpty()}
            causeDamage={causeDamage}
            damageMode={damageMode}
            index={index}
            item={item}
            key={`${item}-${index + 1}`}
            onClickDrop={changeInHand}
            selectSlot={selectSlot}
            slotType="inHand"
            wounded={character.wounded}
          />
        ))}
      </CharItems>
      <CharItems slotType="inBackpack">
        {inBackpack.map((item, index) => (
          <ItemsArea
            allSlotsAreEmpty={allSlotsAreEmpty()}
            causeDamage={causeDamage}
            damageMode={damageMode}
            index={index}
            item={item}
            key={`${item}-${index + 3}`}
            noAudio
            onClickDrop={changeInBackpack}
            selectSlot={selectSlot}
            slotType="inBackpack"
            wounded={character.wounded}
          />
        ))}
      </CharItems>
      {slot && slot <= 2 && (
        <ItemsSelectorModal onSelect={changeInHand} slotType="inHand" />
      )}
      {slot && slot >= 3 && (
        <ItemsSelectorModal onSelect={changeInBackpack} slotType="inBackpack" />
      )}

      {(characters.length > 1 || prevCharIndex.current === null) && (
        <>
          <PreviousButton
            damageMode={damageMode}
            onClick={changeToPreviousPlayer}
            type="button"
          >
            PREVIOUS
          </PreviousButton>
          <NextButton
            damageMode={damageMode}
            onClick={changeToNextPlayer}
            type="button"
          >
            NEXT
          </NextButton>
        </>
      )}
      {selectCharOverlay && (
        <SelectButton onClick={selectCharacter} type="button">
          SELECT
        </SelectButton>
      )}
    </CharacterSheet>
  );
};

PlayersSection.propTypes = {
  damageMode: bool.isRequired,
  initialCharacters: arrayOf(characterTypes),
  loadGame: func.isRequired,
  loadedGame: arrayOf(characterTypes),
  toggleDamageMode: func.isRequired
};

PlayersSection.defaultProps = {
  initialCharacters: null,
  loadedGame: null
};

export default PlayersSection;
