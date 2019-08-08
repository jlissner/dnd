import React, { useEffect, useState } from 'react';
import { MOVE_CHARACTER } from './hooks/useGameBoard';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	character: {
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
	const { topOffset, leftOffset, scale } = board;
	const [ top, setTop ] = useState(y * scale);
	const [ left, setLeft ] = useState(x * scale);

	useEffect(() => {
		setTop(y * scale);
		setLeft(x * scale);
	}, [ x, y, scale ]);

	function stopMoving({ clientX, clientY }) {
		window.removeEventListener('mousemove', move);
		window.removeEventListener('mouseup', stopMoving);

		const curY = clientY - topOffset - (scale / 2);
		const curX = clientX - leftOffset - (scale / 2);
		const newY = Math.round(curY / scale);
		const newX = Math.round(curX / scale);

		dispatch({
			type: MOVE_CHARACTER,
			payload: {
				name,
				x: newX,
				y: newY,
			}
		})
	}

	function move({ clientX, clientY }) {
		setTop(clientY - topOffset - (scale / 2));
		setLeft(clientX - leftOffset - (scale / 2));
	}

	function startMoving() {
		window.addEventListener('mousemove', move);
		window.addEventListener('mouseup', stopMoving);
	}

	function stopMovingTouch({ changedTouches }) {
		window.removeEventListener('touchmove', moveTouch);
		window.removeEventListener('touchend', stopMovingTouch);

		const { clientX, clientY } = changedTouches[0]
		const curY = clientY - topOffset - (scale / 2);
		const curX = clientX - leftOffset - (scale / 2);
		const newY = Math.round(curY / scale);
		const newX = Math.round(curX / scale);

		dispatch({
			type: MOVE_CHARACTER,
			payload: {
				name,
				x: newX,
				y: newY,
			}
		})
	}

	function moveTouch({ changedTouches }) {
		const { clientX, clientY } = changedTouches[0]

		setTop(clientY - topOffset - (scale / 2));
		setLeft(clientX - leftOffset - (scale / 2));
	}

	function startMovingTouch() {
		window.addEventListener('touchmove', moveTouch);
		window.addEventListener('touchend', stopMovingTouch);
	}

	return (
		<div
			className={classes.character}
			style={{
				top,
				left,
				background,
				height: scale,
				width: scale,
			}}
			onMouseDown={startMoving}
			onTouchStart={startMovingTouch}
		/>
	)
}

export default withStyles(styles)(CharacterIcon);
