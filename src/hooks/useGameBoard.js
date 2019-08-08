import { useReducer } from 'react';
import _cloneDeep from 'lodash/cloneDeep';
import _filter from 'lodash/filter';
import _findIndex from 'lodash/findIndex';

export const SET_SIZE = 'GAME_BOARD::SET_SIZE';
export const SET_SCALE = 'GAME_BOARD::SET_SCALE';
export const ADD_CHARACTER = 'GAME_BOARD::ADD_CHARACTER';
export const REMOVE_CHARACTER = 'GAME_BOARD::REMOVE_CHARACTER';
export const MOVE_CHARACTER = 'GAME_BOARD::MOVE_CHARACTER';

const initialState = {
	height: 0,
	width: 0,
	characters: [],
	scale: 50,
}

function reducer(state, action) {
	switch (action.type) {
		case SET_SIZE: {
			const { width, height } = action.payload;

			return {
				...state,
				width,
				height,
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

function useGameBoard() {
	const [ state, dispatch ] = useReducer(reducer, initialState);

	return {
		state,
		dispatch,
	};
}

export default useGameBoard
