import React, { useEffect, useState, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import _find from 'lodash/find';
import { MOVE_CHARACTER } from './hooks/useGameBoard';

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
	const activeTouch = useRef({});

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
		const touch = _find(changedTouches, { identifier: activeTouch.current.id });

		if (!touch) {
			return;
		}
	
		window.removeEventListener('touchmove', moveTouch);
		window.removeEventListener('touchend', stopMovingTouch);
		window.removeEventListener('touchcancel', stopMovingTouch);

		const { clientX, clientY } = touch;
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
		});

		activeTouch.current.id = null;
	}

	function moveTouch(evt) {;
		evt.preventDefault();


		const { changedTouches } = evt;
		const touch = _find(changedTouches, { identifier: activeTouch.current.id });

		if (!touch) {
			return
		}
		const { clientX, clientY } = touch;

		setTop(clientY - topOffset - (scale / 2));
		setLeft(clientX - leftOffset - (scale / 2));
	}

	function startMovingTouch(evt) {
		activeTouch.current.id = evt.changedTouches[0].identifier;

		window.addEventListener('touchmove', moveTouch, { passive: false });
		window.addEventListener('touchend', stopMovingTouch);
		window.addEventListener('touchcancel', stopMovingTouch);
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
