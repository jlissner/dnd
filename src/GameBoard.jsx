import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import _times from 'lodash/times';

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
	},
	canvasWrapper: {
		height: '100%',
		width: '100%',
	}
})

function GameBoard({
	classes
}) {
	const [ loaded, setLoaded ] = useState(false)
	const canvasWrapper = document.querySelector(`.${classes.canvasWrapper}`);

	useEffect(() => {
		setLoaded(true);
	}, []);

	useEffect(() => {
		if (loaded) {
			drawGrid(classes.canvas)
		}
	}, [loaded])

	if (!loaded) {
		return <div className={classes.canvasWrapper} />
	}

	return (
		<div className={classes.canvasWrapper}>
				<canvas
						className={classes.canvas}
						width={canvasWrapper.offsetWidth}
						height={canvasWrapper.offsetHeight}
					>
				<p>Browser Unsupported</p>
			</canvas>
		</div>
	)
}

export default withStyles(styles)(GameBoard)
