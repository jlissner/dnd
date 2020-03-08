import { createMuiTheme } from '@material-ui/core/styles';

// #FFFEBD -- white
// #F7CE65 -- secondary
// #930C10 -- primary
// #290000 -- primary__dark
// #030303 -- black

const theme = createMuiTheme({
	palette: {
		secondary: { main: '#F7CE65'},
		primary: {
			main: '#931c10',
			dark: '#290000',
		},
		common: {
			black: '#030303',
			white: '#FFFEBD',
		},
		background: {
			paper: '#FFFEBD',
		}
	},
	overrides: {
		MuiTableCell: {
			root: {
				borderBottomColor: 'rgba(0, 0, 0, 0.42)',
			},
			head: {
				fontWeight: 700,
			},
		},
	},
});

export default theme;