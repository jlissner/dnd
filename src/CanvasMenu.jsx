import React from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function CanvasMenu() {
	return (
		<Paper>
			<List>
				<ListItem button selected>
					<ListItemText primary="Line" />
				</ListItem>
				<ListItem button>
					<ListItemText primary="Arc" />
				</ListItem>
			</List>
		</Paper>
	)
};

export default CanvasMenu;
