import React from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function PlayerList() {
	return (
		<Paper>
			<List>
				<ListItem button selected>
					<ListItemText primary="Smash" />
				</ListItem>
				<ListItem button>
					<ListItemText primary="Arcanis" />
				</ListItem>
			</List>
		</Paper>
	)
};

export default PlayerList;
