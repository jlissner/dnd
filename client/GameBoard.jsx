import React, { useCallback, useEffect, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import _map from 'lodash/map';
import _times from 'lodash/times';
import _find from 'lodash/find';
import CharacterIcon from './CharacterIcon';
import { SET_SIZE, SET_SCALE, SET_OFFSET } from './hooks/useGameBoard';

function drawGrid(canvasClass, scale, offset) {
	const canvas = document.querySelector(`.${canvasClass}`);
	const width = canvas.width;
	const height = canvas.height;
	const [ xOffset, yOffset ] = offset;
	const ctx = canvas.getContext('2d');

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.lineWidth = 1;
	ctx.strokeStyle = '#aaa';
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(0, height);
	ctx.stroke();

	ctx.moveTo(width, 0);
	ctx.lineTo(width, height);
	ctx.stroke();

	ctx.moveTo(0, height);
	ctx.lineTo(width, height);
	ctx.stroke();

	const numOfHorizontalLines = Math.ceil( height / scale );
	const numOfVerticalLines = Math.ceil( width / scale );
	const xGridOffset = xOffset % scale;
	const yGridOffset = yOffset % scale;

	_times(numOfHorizontalLines + 1, (i) => {
		ctx.moveTo(0, ((i * scale) + yGridOffset));
		ctx.lineTo(width, ((i * scale) + yGridOffset));
		ctx.stroke();
	});

	_times(numOfVerticalLines + 1, (i) => {
		ctx.moveTo(((i * scale) + xGridOffset), 0);
		ctx.lineTo(((i * scale) + xGridOffset), height);
		ctx.stroke();
	});
}

// function drawLine(canvasClass, scale) {
// }

const styles = theme => ({
	canvas: {
		backgroundColor: '#f0f0f0',
		position: 'absolute',
		top: 0,
		left: 0,
		zIndex: 1,
	},
	boardWrapper: {
		position: 'fixed',
		top: 56,
		left: 0,
		right: 0,
		bottom: 0,
	}
})

function GameBoard({
	classes,
	gameBoard
}) {
	const boardWrapper = document.querySelector(`.${classes.boardWrapper}`);
	const { state, dispatch } = gameBoard;
	const { characters, size, offset, scale } = state;
	const [ width, height ] = size;
	const [ xOffset, yOffset ] = offset;
	const activeTouch = useRef({});
	const resize = useCallback(() => dispatch({
		type: SET_SIZE,
		payload: [
			window.outerWidth,
			window.outerHeight,
		]
	}), [dispatch]);

	useEffect(() => {
		window.addEventListener('resize', resize);

		return () => {
			window.removeEventListener('resize', resize);
		}
	}, [dispatch, resize]);

	useEffect(() => {
		dispatch({
			type: SET_SIZE,
			payload: [
				window.outerWidth,
				window.outerHeight,
			]
		})
	}, [dispatch])

	useEffect(() => {
		drawGrid(classes.canvas, scale, offset);
	}, [scale, classes, height, width, offset]);

	function moveBoard(evt) {
		const { clientX, clientY } = evt;
		const [ startX, startY ] = activeTouch.current.start;

		dispatch({
			type: SET_OFFSET,
			payload: [
				xOffset + (clientX - startX),
				yOffset + (clientY - startY),
			]
		});
	}

	function startMovingBoard(evt) {
		const { clientX, clientY } = evt;
		activeTouch.current.start = [ clientX, clientY ];


		window.addEventListener('mousemove', moveBoard);
		window.addEventListener('mouseup', stopMoving);
	}

	function stopMoving() {
		window.removeEventListener('mousemove', moveBoard);
		window.removeEventListener('mouseup', stopMoving);
		window.removeEventListener('mousedown', stopMoving);
	}

	function moveBoardTouch(evt) {
		evt.preventDefault();

		const { changedTouches } = evt;
		const touch = _find(changedTouches, { identifier: activeTouch.current.id });

		if (!touch) {
			return;
		}

		const { clientX, clientY } = touch;
		const [ startX, startY ] = activeTouch.current.start;

		dispatch({
			type: SET_OFFSET,
			payload: [
				xOffset + (clientX - startX),
				yOffset + (clientY - startY),
			]
		});
	}

	function stopMovingTouch() {
		window.removeEventListener('touchmove', moveBoardTouch);
		window.removeEventListener('touchend', stopMovingTouch);
		window.removeEventListener('touchcancel', stopMovingTouch);
	}

	function startMovingBoardTouch(evt) {
		const { clientX, clientY, identifier } = evt.changedTouches[0];
		activeTouch.current.id = identifier;
		activeTouch.current.start = [ clientX, clientY ];

		window.addEventListener('touchmove', moveBoardTouch, { passive: false });
		window.addEventListener('touchend', stopMovingTouch);
		window.addEventListener('touchcancel', stopMovingTouch);
	}

	return (
		<div
			className={classes.boardWrapper}
			onMouseDown={startMovingBoard}
			onTouchStart={startMovingBoardTouch}
		>
				<canvas
					className={classes.canvas}
					width={width}
					height={height}
				>
				<p>Browser Unsupported</p>
			</canvas>
			<button style={{ bottom: 32, right: 32, zIndex: 2, position: 'absolute'}} onClick={() => dispatch({ type: SET_SCALE, payload: scale - 5 })}>Zoom Out</button>
			<button style={{ bottom: 32, right: 116, zIndex: 2, position: 'absolute'}} onClick={() => dispatch({ type: SET_SCALE, payload: scale + 5 })}>Zoom In</button>
			{
				_map(characters, character => (
					<CharacterIcon
						key={character.name}
						character={character}
						dispatch={dispatch}
						board={{
							leftOffset: boardWrapper.getBoundingClientRect().left,
							topOffset: boardWrapper.getBoundingClientRect().top,
							scale,
							offset,
						}}
					/>
				))
			}
		</div>
	)
}

export default withStyles(styles)(GameBoard)
