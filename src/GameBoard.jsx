import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import _map from 'lodash/map';
import _times from 'lodash/times';
import CharacterIcon from './CharacterIcon';
import { SET_SIZE } from './hooks/useGameBoard';

function drawGrid(canvasClass) {
	const canvas = document.querySelector(`.${canvasClass}`);
	const boxSize = 50;
	const width = canvas.width;
	const height = canvas.height;
	const ctx = canvas.getContext('2d');

	ctx.lineWidth = 1;
	ctx.fillStyle = '#333333';
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

	const numOfHorizontalLines = Math.ceil( height / boxSize );
	const numOfVerticalLines = Math.ceil( width / boxSize );

	_times(numOfHorizontalLines, (i) => {
		ctx.moveTo(0, i * boxSize);
		ctx.lineTo(width, i * boxSize);
		ctx.stroke();
	});

	_times(numOfVerticalLines, (i) => {
		ctx.moveTo(i * boxSize, 0);
		ctx.lineTo(i * boxSize, height);
		ctx.stroke();
	});
}

const styles = theme => ({
	canvas: {
		background: 'pink',
		position: 'absolute',
		top: 0,
		left: 0,
		zIndex: 1,
	},
	canvasWrapper: {
		height: '100%',
		width: '100%',
		position: 'relative',
	}
})

function GameBoard({
	classes,
	gameBoard
}) {
	const [ loaded, setLoaded ] = useState(false)
	const canvasWrapper = document.querySelector(`.${classes.canvasWrapper}`);
	const { state, dispatch } = gameBoard;

	useEffect(() => {
		setLoaded(true);
	}, []);

	useEffect(() => {
		if (loaded) {
			dispatch({
				type: SET_SIZE,
				payload: {
					width: canvasWrapper.offsetWidth,
					height: canvasWrapper.offsetHeight,
				}
			})
		}
	}, [loaded, canvasWrapper, dispatch])

	useEffect(() => {
		if (loaded) {
			drawGrid(classes.canvas);
		}
	}, [state, loaded, classes])

	if (!loaded) {
		return <div className={classes.canvasWrapper} />
	}

	return (
		<div className={classes.canvasWrapper}>
				<canvas
					className={classes.canvas}
					width={state.width}
					height={state.height}
				>
				<p>Browser Unsupported</p>
			</canvas>
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
							topOffset: canvasWrapper.getBoundingClientRect().top
						}}
					/>
				))
			}
		</div>
	)
}

export default withStyles(styles)(GameBoard)
