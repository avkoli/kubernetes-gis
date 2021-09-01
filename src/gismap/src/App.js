import './App.css';
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import MapView from "./components/MapView";
import SearchBar from "./components/SearchBar";
import Navigator from './components/Navigator';
import AuthToken from './components/AuthToken';

console.log('NODE_ENV: ' + process.env.NODE_ENV);
console.log('GEOSERVER: ' + process.env.REACT_APP_GEOSERVER);
console.log('WMS: ' + process.env.REACT_APP_WMS_URL);

  function Copyright() {
	return (
	  <Typography variant="body2" color="textSecondary" align="center">
		{'Copyright © '}
		<Link color="inherit" href="https://savaproject.com/">
		  Your Website
		</Link>{' '}
		{new Date().getFullYear()}
		{'.'}
	  </Typography>
	);
  }
  
  let theme = createTheme({
	palette: {
	  primary: {
		light: '#63ccff',
		main: '#009be5',
		dark: '#006db3',
	  },
	},
	typography: {
	  h5: {
		fontWeight: 500,
		fontSize: 26,
		letterSpacing: 0.5,
	  },
	},
	shape: {
	  borderRadius: 8,
	},
	props: {
	  MuiTab: {
		disableRipple: true,
	  },
	},
	mixins: {
	  toolbar: {
		minHeight: 48,
	  },
	},
  });
  
  theme = {
	...theme,
	overrides: {
	  MuiDrawer: {
		paper: {
		  backgroundColor: '#18202c',
		},
	  },
	  MuiButton: {
		label: {
		  textTransform: 'none',
		},
		contained: {
		  boxShadow: 'none',
		  '&:active': {
			boxShadow: 'none',
		  },
		},
	  },
	  MuiTabs: {
		root: {
		  marginLeft: theme.spacing(1),
		},
		indicator: {
		  height: 3,
		  borderTopLeftRadius: 3,
		  borderTopRightRadius: 3,
		  backgroundColor: theme.palette.common.white,
		},
	  },
	  MuiTab: {
		root: {
		  textTransform: 'none',
		  margin: '0 16px',
		  minWidth: 0,
		  padding: 0,
		  [theme.breakpoints.up('md')]: {
			padding: 0,
			minWidth: 0,
		  },
		},
	  },
	  MuiIconButton: {
		root: {
		  padding: theme.spacing(1),
		},
	  },
	  MuiTooltip: {
		tooltip: {
		  borderRadius: 4,
		},
	  },
	  MuiDivider: {
		root: {
		  backgroundColor: '#404854',
		},
	  },
	  MuiListItemText: {
		primary: {
		  fontWeight: theme.typography.fontWeightMedium,
		},
	  },
	  MuiListItemIcon: {
		root: {
		  color: 'inherit',
		  marginRight: 0,
		  '& svg': {
			fontSize: 20,
		  },
		},
	  },
	  MuiAvatar: {
		root: {
		  width: 32,
		  height: 32,
		},
	  },
	},
  };
  
  const drawerWidth = 256;
  
  const styles = {
	root: {
	  display: 'flex',
	  minHeight: '100vh',
	},
	drawer: {
	  [theme.breakpoints.up('sm')]: {
		width: drawerWidth,
		flexShrink: 0,
	  },
	},
	app: {
	  flex: 1,
	  display: 'flex',
	  flexDirection: 'column',
	},
	main: {
	  flex: 1,
	  padding: theme.spacing(6, 4),
	  background: '#eaeff1',
	},
	footer: {
	  padding: theme.spacing(2),
	  background: '#eaeff1',
	},
  };  

function App(props) {

	const { classes } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [authToken, setAuthToken] = React.useState(null);
	const [preset, setPreset] = React.useState('NDVI');
	const [layers, setLayers] = React.useState('NDVI');

	const handleDrawerToggle = () => {
	  setMobileOpen(!mobileOpen);
	};

	const setToken = token => {
		setAuthToken(token);
	};

	const handleDrawerListItemClicked = (preset, layers) => {
		setPreset(preset);
		setLayers(layers);
		setMobileOpen(!mobileOpen);
	}

	return (
		<Grid>
			<AuthToken setToken={setToken} />
			 <nav className={clsx(classes.drawer)}>
				<Navigator
					open={mobileOpen}
					onClose={handleDrawerToggle}
					handleDrawerListItemClicked={handleDrawerListItemClicked}
				/>
			</nav>
			<SearchBar handleDrawerToggle={handleDrawerToggle} />
			<MapView preset={preset} layers={layers} />
		</Grid>
	);
}

App.propTypes = {
	classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(App);

