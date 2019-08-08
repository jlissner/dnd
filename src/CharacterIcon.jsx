import React, { useEffect, useState } from 'react';
import { MOVE_CHARACTER } from './hooks/useGameBoard';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	character: {
		height: 50,
		width: 50,
		position: 'absolute',
		zIndex: 103,
		borderRadius: '50%',
	}
})

function CharacterIcon({
	board,
	classes,
	character,
	dispatch
}) {
	const { x, y, background, name } = character;
	const { topOffset, leftOffset } = board;
	const [ top, setTop ] = useState(y * 50);
	const [ left, setLeft ] = useState(x * 50);

	useEffect(() => {
		setTop(y * 50);
		setLeft(x * 50);
	}, [ x, y ]);

	function move({ clientX, clientY }) {
		setTop(clientY - topOffset - 25);
		setLeft(clientX - leftOffset - 25);
	}

	function stopMoving({ clientX, clientY }) {
		window.removeEventListener('mousemove', move);
		window.removeEventListener('mouseup', stopMoving);

		const curY = clientY - topOffset - 25;
		const curX = clientX - leftOffset - 25;
		const newY = Math.round(curY / 50);
		const newX = Math.round(curX / 50);

		dispatch({
			type: MOVE_CHARACTER,
			payload: {
				name,
				x: newX,
				y: newY,
			}
		})
	}

	function startMoving() {
		window.addEventListener('mousemove', move);
		window.addEventListener('mouseup', stopMoving);
	}

	return (
		<div
			id={`char-${name}`}
			className={classes.character}
			style={{
				top,
				left,
				background,
			}}
			onMouseDown={startMoving}
		/>
	)
}

export default withStyles(styles)(CharacterIcon);
