import React from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import _find from 'lodash/find';
import { ADD_CHARACTER } from './hooks/useGameBoard';

function PlayerList({
	gameBoard,
}) {
	const { state, dispatch } = gameBoard;

	function addCharacter(character) {
		if (!_find(state.characters, toon => toon.name === character.name))
		dispatch({ type: ADD_CHARACTER, payload: character })
	}

	return (
		<Paper>
			<List>
				<ListItem button>
					<ListItemText primary="Smash" onClick={() => addCharacter({name: 'Smash', x: 0, y: 0, background: 'green' })} />
				</ListItem>
				<ListItem button>
					<ListItemText primary="Arcanis" onClick={() => addCharacter({name: 'Arcanis', x: 1, y: 1, background: 'yellow'})}  />
				</ListItem>
			</List>
		</Paper>
	)
};

export default PlayerList;
