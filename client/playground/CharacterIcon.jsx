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
	const { topOffset, leftOffset, scale, offset } = board;
	const [ xOffset, yOffset ] = offset;
	const [ top, setTop ] = useState(y * scale);
	const [ left, setLeft ] = useState(x * scale);
	const activeTouch = useRef({});

	useEffect(() => {
		setTop(y * scale);
		setLeft(x * scale);
	}, [ character, scale, x, y ]);

	function stopMoving({ clientX, clientY }) {
		window.removeEventListener('mousemove', move);
		window.removeEventListener('mouseup', stopMoving);

		const curY = clientY - topOffset - yOffset - (scale / 2);
		const curX = clientX - leftOffset - xOffset - (scale / 2);
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
		setLeft(clientX - leftOffset - xOffset - (scale / 2));
		setTop(clientY - topOffset - yOffset - (scale / 2));
	}

	function startMoving(evt) {
		evt.stopPropagation();

		window.addEventListener('mousemove', move);
		window.addEventListener('mouseup', stopMoving);
	}

	function moveTouch(evt) {;
		evt.preventDefault();


		const { changedTouches } = evt;
		const touch = _find(changedTouches, { identifier: activeTouch.current.id });

		if (!touch) {
			return
		}
		const { clientX, clientY } = touch;

		setLeft(clientX - leftOffset - xOffset - (scale / 2));
		setTop(clientY - topOffset - yOffset - (scale / 2));
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
		const curY = clientY - topOffset - yOffset - (scale / 2);
		const curX = clientX - leftOffset - xOffset - (scale / 2);
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

	function startMovingTouch(evt) {
		evt.stopPropagation();
		activeTouch.current.id = evt.changedTouches[0].identifier;

		window.addEventListener('touchmove', moveTouch, { passive: false });
		window.addEventListener('touchend', stopMovingTouch);
		window.addEventListener('touchcancel', stopMovingTouch);
	}

	return (
		<div
			className={classes.character}
			style={{
				top: top + yOffset,
				left: left + xOffset,
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
