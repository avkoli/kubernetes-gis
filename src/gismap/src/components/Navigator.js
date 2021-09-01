import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import TimerIcon from '@material-ui/icons/Timer';
import SettingsIcon from '@material-ui/icons/Settings';
import LayersIcon from '@material-ui/icons/Layers';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import TrafficIcon from '@material-ui/icons/Traffic';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';

const categories = [
  {
    id: 'Layers',
    children: [
      { id: 'Natural Color (true color)', icon: <LayersIcon />, preset: 'NATURAL-COLOR', layers: 'B01,B02,B03', active: true },
	  { id: 'Bathymetric', icon: <LayersIcon />, preset: 'BATHYMETRIC', layers: 'B01,B02,B03' }, 
	  { id: 'False Color (vegetation)', icon: <LayersIcon />, preset: 'FALSE-COLOR', layers: 'B01,B02,B03' },
      { id: 'False Color (urban)', icon: <LayersIcon />, preset: 'FALSE-COLOR-URBAN', layers: 'B01,B02,B03' },
      { id: 'Geology', icon: <LayersIcon />, preset: 'GEOLOGY', layers: 'B01,B02,B03' },
	  { id: 'Moisture Index', icon: <LayersIcon />, preset: 'MOISTURE-INDEX', layers: 'B01,B02,B03' },
      { id: 'NDVI', icon: <LayersIcon />, preset: 'NDVI', layers: 'B01,B02,B03' },
	  { id: 'SWIR', icon: <LayersIcon />, preset: 'SWIR', layers: 'B01,B02,B03' },
	  { id: 'True Color S2L2A', icon: <LayersIcon />, preset: 'TRUE-COLOR-S2L2A', layers: 'B01,B02,B03' },
    ],
  },
  {
    id: 'Explore',
    children: [
      { id: 'Weather', icon: <WbSunnyIcon />, preset: '', layers: '' },
      { id: 'Traffic', icon: <TrafficIcon />, preset: '', layers: '' },
      { id: 'Hospitals', icon: <LocalHospitalIcon />, preset: '', layers: '' },
    ],
  },
];

const styles = (theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color:  theme.palette.common.white,
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: '#4fc3f7',
  },
  itemPrimary: {
    fontSize: 'inherit',
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
});

function Navigator(props) {
  const { classes, ...other } = props;

  return (
    <Drawer {...other}>
      <List disablePadding>
        <ListItem >
          GIS
        </ListItem>
        <ListItem >
          <ListItemIcon >
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary,
            }}
          >
            MAP
          </ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            <ListItem>
              <ListItemText>
                {id}
              </ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, preset, layers, active }) => (
              <ListItem
                key={childId}
                button
				onClick={() => props.handleDrawerListItemClicked(preset, layers)}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText>
                  {childId}
                </ListItemText>
              </ListItem>
            ))}
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);