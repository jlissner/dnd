import { useReducer } from 'react';
import _findIndex from 'lodash/findIndex';
import _cloneDeep from 'lodash/cloneDeep';

export const SET_SIZE = 'GAME_BOARD::SET_SIZE';
export const ADD_CHARACTER = 'GAME_BOARD::ADD_CHARACTER';
export const MOVE_CHARACTER = 'GAME_BOARD::MOVE_CHARACTER';

const initialState = {
	height: 0,
	width: 0,
	characters: [],
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
		case ADD_CHARACTER: {
			const characters = [...state.characters, action.payload];

			return {
				...state,
				characters
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
