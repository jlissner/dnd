import { useReducer } from 'react';
import _cloneDeep from 'lodash/cloneDeep';
import _filter from 'lodash/filter';
import _findIndex from 'lodash/findIndex';
import useWebsocket from './useWebsocket';

export const SET_SIZE = 'GAME_BOARD::SET_SIZE';
export const SET_OFFSET = 'GAME_BOARD::SET_OFFSET';
export const SET_SCALE = 'GAME_BOARD::SET_SCALE';
export const ADD_CHARACTER = 'GAME_BOARD::ADD_CHARACTER';
export const REMOVE_CHARACTER = 'GAME_BOARD::REMOVE_CHARACTER';
export const MOVE_CHARACTER = 'GAME_BOARD::MOVE_CHARACTER';

const initialState = {
  playerName: '',
  characterName: '',
  className: '',
  level: '',
  race: '',
  alignment: '',
  xp: null,
  ac: null,
  initiative: null,
  speed: null,
  attributes: [
    {
      name: 'strength',
      abbv: 'str',
      value: null,
      modifier: null,
      proficient: null,
      notes: '',
    },
    {
      name: 'dexterity',
      abbv: 'dex',
      value: null,
      modifier: null,
      proficient: null,
      notes: '',
    },
    {
      name: 'constitution',
      abbv: 'con',
      value: null,
      modifier: null,
      proficient: null,
      notes: '',
    },
    {
      name: 'intelligence',
      abbv: 'int',
      value: null,
      modifier: null,
      proficient: null,
      notes: '',
    },
    {
      name: 'wisdom',
      abbv: 'wis',
      value: null,
      modifier: null,
      proficient: null,
      notes: '',
    },
    {
      name: 'charisma',
      abbv: 'cha',
      value: null,
      modifier: null,
      proficient: null,
      notes: '',
    },
  ],
  skills: [
    {
      name: 'Acrobatics',
      modifiers: [], // something like { name: 'Boots of Jumping', value: 1, notes: 'Got these from killing the goblin king'}
      type: 'dex',
      proficient: null,
      notes: '',
    },
    {
      name: 'Animal Handling',
      modifiers: [],
      type: 'wis',
      proficient: null,
      notes: '',
    },
    {
      name: 'Arcana',
      modifiers: [],
      type: 'int',
      proficient: null,
      notes: '',
    },
    {
      name: 'Athletics',
      modifiers: [],
      type: 'str',
      proficient: null,
      notes: '',
    },
    {
      name: 'Deception',
      modifiers: [],
      type: 'cha',
      proficient: null,
      notes: '',
    },
    {
      name: 'History',
      modifiers: [],
      type: 'int',
      proficient: null,
      notes: '',
    },
    {
      name: 'Insight',
      modifiers: [],
      type: 'wis',
      proficient: null,
      notes: '',
    },
    {
      name: 'Intimidation',
      modifiers: [],
      type: 'cha',
      proficient: null,
      notes: '',
    },
    {
      name: 'Investigation',
      modifiers: [],
      type: 'int',
      proficient: null,
      notes: '',
    },
    {
      name: 'Medicine',
      modifiers: [],
      type: 'wis',
      proficient: null,
      notes: '',
    },
    {
      name: 'Nature',
      modifiers: [],
      type: 'int',
      proficient: null,
      notes: '',
    },
    {
      name: 'Perception',
      modifiers: [],
      type: 'wis',
      proficient: null,
      notes: '',
    },
    {
      name: 'Performance',
      modifiers: [],
      type: 'cha',
      proficient: null,
      notes: '',
    },
    {
      name: 'Persuasion',
      modifiers: [],
      type: 'cha',
      proficient: null,
      notes: '',
    },
    {
      name: 'Religion',
      modifiers: [],
      type: 'int',
      proficient: null,
      notes: '',
    },
    {
      name: 'Sleight of Handling',
      modifiers: [],
      type: 'dex',
      proficient: null,
      notes: '',
    },
    {
      name: 'Stealth',
      modifiers: [],
      type: 'dex',
      proficient: null,
      notes: '',
    },
    {
      name: 'Survival',
      modifiers: [],
      type: 'wis',
      proficient: null,
      notes: '',
    },
  ],
  languages: ['Common'],
  proficiencies: [],
  money: {
    cp: null,
    sp: null,
    ep: null,
    gp: null,
    pp: null,
  },
  equipment: {
    armor: [], // { name, ac, modifier, modifierMax, preqStr, stealth, weight, notes }
    weapons: [], // { name, modifier, dmg, stat, range, weight, notes }
    other: [],
  },
  status: [],
  featuresAndTraits: '',
  inspiration: '',
  proficiencyBonus: null,
  savingThrows: [],
  health: {
    hitDice: '',
    numOfHitDice: null,
    currentHp: null,
    totalHp: null,
    maxHp: null,
    tempHp: null,
    deathSaves: [], // [true, false, false, true, true] === 3 success 2 fails
  },
  personality: {
    traits: '',
    ideals: '',
    bonds: '',
    flaws: '',
    backstory: '',
  },
  appearance: {
    age: null,
    height: '',
    weight: '',
    eyes: '',
    skin: '',
    hair: '',
  },
  spells: [],
}

function reducer(state, action) {
  switch (action.type) {
    case SET_SIZE: {
      return {
        ...state,
        size: action.payload,
      }
    }
    case SET_OFFSET: {
      return {
        ...state,
        offset: action.payload,
      }
    }
    case SET_SCALE: {
      return {
        ...state,
        scale: action.payload
      }
    }
    case ADD_CHARACTER: {
      const characters = [...state.characters, action.payload];

      return {
        ...state,
        characters
      }
    }
    case REMOVE_CHARACTER: {
      const updatedCharacters = _filter(state.characters, ({ name }) => name !== action.payload);

      return {
        ...state,
        characters: updatedCharacters,
      }
    }
    case MOVE_CHARACTER: {
      const { x, y, name } = action.payload;
      const { characters } = state;
      const charToMoveIndex = _findIndex(state.characters, { name });
      const updatedChar = {
        ...characters[charToMoveIndex],
        x,
        y,
      };
      const updatedCharacters = _cloneDeep(characters);

      updatedCharacters[charToMoveIndex] = updatedChar;

      return {
        ...state,
        characters: updatedCharacters,
      }
    }
    default: {
      return state;
    }
  }
}

function useCharacter(id) {
  const [ state, dispatch ] = useReducer(reducer, initialState);
  const { message, readyState, send } = useWebsocket(`ws://${window.location.host}/echo`);

  return [
    state,
    dispatch,
  ];
}

export default useCharacter
