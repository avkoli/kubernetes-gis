import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { createTheme, ThemeProvider, makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

const theme = createTheme();

const styles = {
	root: {
	  right: '16px',
	  left: '16px',
	  position: 'absolute',
	  'z-index': '900',
	  'margin-top': '11px',
	  'margin-left': '100px',
	  display: 'flex',
	  alignItems: 'center',
	  width: 400,
	},
	input: {
	  marginLeft: theme.spacing(1),
	  flex: 1,
	},
	iconButton: {
	  padding: 10,
	},
	divider: {
	  height: 28,
	  margin: 4,
	},
};

function SearchBar(props) {
	const { classes, ...other } = props;
	
	return (
		<Paper component="form" className={clsx(classes.root)}>
			<IconButton className={clsx(classes.iconButton)} aria-label="menu" onClick={props.handleDrawerToggle}>
				<MenuIcon />
			</IconButton>
			<InputBase
				className={clsx(classes.input)}
				placeholder="Search GIS"
				inputProps={{ 'aria-label': 'search gis maps' }}
			/>
			<IconButton type="submit" className={clsx(classes.iconButton)} aria-label="search">
				<SearchIcon />
			</IconButton>
			{/* <Divider className={clsx(classes.divider)} orientation="vertical" /> */}
			{/* <IconButton color="primary" className={clsx(classes.iconButton)} aria-label="directions">
				<DirectionsIcon />
			</IconButton> */}
		</Paper>
	);
}

SearchBar.propTypes = {
	classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(SearchBar);

