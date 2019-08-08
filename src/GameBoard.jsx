import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import _map from 'lodash/map';
import _times from 'lodash/times';
import CharacterIcon from './CharacterIcon';
import { SET_SIZE, SET_SCALE } from './hooks/useGameBoard';

function drawGrid(canvasClass, scale) {
	const canvas = document.querySelector(`.${canvasClass}`);
	const width = canvas.width;
	const height = canvas.height;
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

	_times(numOfHorizontalLines, (i) => {
		ctx.moveTo(0, i * scale);
		ctx.lineTo(width, i * scale);
		ctx.stroke();
	});

	_times(numOfVerticalLines, (i) => {
		ctx.moveTo(i * scale, 0);
		ctx.lineTo(i * scale, height);
		ctx.stroke();
	});
}

function drawLine(canvasClass, scale) {

}

const styles = theme => ({
	canvas: {
		backgroundColor: '#f0f0f0',
		position: 'absolute',
		top: 0,
		left: 0,
		zIndex: 1,
	},
	canvasWrapper: {
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
	const canvasWrapper = document.querySelector(`.${classes.canvasWrapper}`);
	const { state, dispatch } = gameBoard;

	useEffect(() => {
		window.addEventListener('resize', () => dispatch({
			type: SET_SIZE,
			payload: {
				width: window.outerWidth,
				height: window.outerHeight,
			}
		}));

		return () => {
			window.removeEventListener('resize');
		}
	}, [dispatch]);

	useEffect(() => {
		dispatch({
			type: SET_SIZE,
			payload: {
				width: window.outerWidth,
				height: window.outerHeight,
			}
		})
	}, [dispatch])

	useEffect(() => {
		drawGrid(classes.canvas, state.scale);
	}, [state, classes])

	return (
		<div className={classes.canvasWrapper}>
				<canvas
					className={classes.canvas}
					width={state.width}
					height={state.height}
				>
				<p>Browser Unsupported</p>
			</canvas>
			<button style={{ bottom: 32, right: 32, zIndex: 2, position: 'absolute'}} onClick={() => dispatch({ type: SET_SCALE, payload: state.scale - 5 })}>Zoom Out</button>
			{
				_map(state.characters, character => (
					<CharacterIcon
						key={character.name}
						character={character}
						dispatch={dispatch}
						board={{
							height: state.height,
							width: state.width,
							leftOffset: canvasWrapper.getBoundingClientRect().left,
							topOffset: canvasWrapper.getBoundingClientRect().top,
							scale: state.scale,
						}}
					/>
				))
			}
		</div>
	)
}

export default withStyles(styles)(GameBoard)
