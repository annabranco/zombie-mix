import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Global } from '@emotion/core';
import { useStateWithLabel } from '../../utils/hooks';
import MainMenu from '../MainMenu';
import NewGame from '../NewGame';
import PlayersSection from '../Sections/PlayersSection';
import Section from '../Sections';
import ZombiesSection from '../Sections/ZombiesSection';
import { MainScreen } from './styles';
import { globalStyles } from '../../styles';

const App = () => {
  const [initialCharacters, setInitialCharacters] = useStateWithLabel(
    [],
    'initialCharacters'
  );
  const [damageMode, toggleDamageMode] = useStateWithLabel(false, 'damageMode');
  const [loadedGame, loadGame] = useStateWithLabel(null, 'damageMode');
  const [zombiesTurn, setZombiesTurn] = useStateWithLabel(null, 'damageMode');

  useEffect(() => {
    const game = JSON.parse(localStorage.getItem('ZombicideParty'));

    if (game && game.length !== 0) {
      loadGame(game);
    } else {
      localStorage.removeItem('ZombicideParty');
    }
  }, []);

  return (
    <Router>
      <Global styles={globalStyles} />
      <Switch>
        <Route
          exact
          path="/"
          render={() => <MainMenu loadedGame={Boolean(loadedGame)} />}
        />
        <Route
          path="/new"
          render={() => (
            <NewGame
              loadedGame={Boolean(loadedGame)}
              setInitialCharacters={setInitialCharacters}
            />
          )}
        />
        <Route
          path="/play"
          render={() => (
            <MainScreen>
              <Section name="Players">
                <PlayersSection
                  damageMode={damageMode}
                  initialCharacters={initialCharacters}
                  loadGame={loadGame}
                  loadedGame={loadedGame}
                  toggleDamageMode={toggleDamageMode}
                  setZombiesTurn={setZombiesTurn}
                />
              </Section>
              <Section name="Zombies">
                <ZombiesSection
                  damageMode={damageMode}
                  toggleDamageMode={toggleDamageMode}
                  zombiesTurn={zombiesTurn}
                />
              </Section>
            </MainScreen>
          )}
        />
      </Switch>
    </Router>
  );
};

export default App;
