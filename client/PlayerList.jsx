import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import _find from 'lodash/find';
import { ADD_CHARACTER, REMOVE_CHARACTER } from './hooks/useGameBoard';

function PlayerList({
	gameBoard,
}) {
	const { state, dispatch } = gameBoard;
	const [ newPlayer, setNewPlayer ] = useState('');
	const [ width, height ] = state.size;

	function addCharacter(character) {
		if (!_find(state.characters, toon => toon.name === character.name)) {
			dispatch({
				type: ADD_CHARACTER,
				payload: {
					...character, 
					x: Math.round((width / 50) / 2),
					y: Math.round((height / 50) / 3),
				}
			})
		}
	}

	function removeCharacter(name) {
		dispatch({ type: REMOVE_CHARACTER, payload: name });
	}

	function saveNewCharacter() {
		addCharacter({ name: newPlayer, background: 'blue' });

		setNewPlayer('');
	}

	return (
		<Paper>
			<List>
				<ListItem button onClick={() => addCharacter({name: 'Smash', background: 'green' })}>
					<ListItemText primary="Smash" />
					<IconButton onClick={() => removeCharacter('Smash')}>
						<CancelIcon />
					</IconButton>
				</ListItem>
				<ListItem button onClick={() => addCharacter({name: 'Arcanis', background: 'yellow'})}>
					<ListItemText primary="Arcanis" />
					<IconButton onClick={() => removeCharacter('Arcanis')}>
						<CancelIcon />
					</IconButton>
				</ListItem>
				<ListItem>
					<ListItemText>
						<TextField
							onChange={evt => setNewPlayer(evt.target.value)}
							value={newPlayer}
						/>
					</ListItemText>
					<ListItemSecondaryAction>
						<IconButton onClick={saveNewCharacter}>
							<AddIcon />
						</IconButton>
					</ListItemSecondaryAction>
				</ListItem>
			</List>
		</Paper>
	)
};

export default PlayerList;
