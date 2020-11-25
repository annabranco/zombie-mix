import Amy from '../assets/images/survivors/amy.jpg';
import Ned from '../assets/images/survivors/ned.jpg';
import Phil from '../assets/images/survivors/phil.jpg';
import Wanda from '../assets/images/survivors/wanda.jpg';
import Josh from '../assets/images/survivors/josh.jpg';
import Doug from '../assets/images/survivors/doug.jpg';
import SelectorAmy from '../assets/images/selectors/selector-amy.png';
import SelectorNed from '../assets/images/selectors/selector-ned.png';
import SelectorPhil from '../assets/images/selectors/selector-phil.png';
import SelectorWanda from '../assets/images/selectors/selector-wanda.png';
import SelectorJosh from '../assets/images/selectors/selector-josh.png';
import SelectorDoug from '../assets/images/selectors/selector-doug.png';

const AMY = {
  abilities: [],
  color: '#a015a3',
  experience: 0,
  img: Amy,
  inBackpack: [],
  inHand: [],
  items: [],
  name: 'Amy',
  player: null,
  selector: SelectorAmy,
  voice: 'female'
};

const NED = {
  abilities: [],
  color: '#b52929',
  experience: 0,
  img: Ned,
  inBackpack: [],
  inHand: [],
  items: [],
  name: 'Ned',
  player: null,
  selector: SelectorNed,
  voice: 'male'
};

const PHIL = {
  abilities: [],
  color: '#565656',
  experience: 0,
  img: Phil,
  inBackpack: [],
  inHand: ['Pistol'],
  items: [],
  name: 'Phil',
  player: null,
  selector: SelectorPhil,
  voice: 'male'
};

const WANDA = {
  abilities: [],
  color: '#339b35',
  experience: 0,
  img: Wanda,
  inBackpack: [],
  inHand: [],
  items: [],
  name: 'Wanda',
  player: null,
  selector: SelectorWanda,
  voice: 'female'
};

const JOSH = {
  abilities: [],
  color: '#ba761d',
  experience: 0,
  img: Josh,
  inBackpack: [],
  inHand: [],
  items: [],
  name: 'Josh',
  player: null,
  selector: SelectorJosh,
  voice: 'male'
};

const DOUG = {
  abilities: [],
  color: '#3566c6',
  experience: 0,
  img: Doug,
  inBackpack: [],
  inHand: [],
  items: [],
  name: 'Doug',
  player: null,
  selector: SelectorDoug,
  voice: 'male'
};

export const CHARACTERS = [AMY, DOUG, JOSH, NED, PHIL, WANDA];
