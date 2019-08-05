import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	player: {
		height: 50,
		width: 50,
		color: red,
		position: 'absolute',
		zIndex: 103
	}
})

function PlayerIcon({
	classes,
	top,
	left,
}) {
	return (
		<div className={classes.player} style={{
			top,
			left,
		}}></div>
	)
}

export default withStyles(styles)(PlayerIcon);
