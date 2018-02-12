import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Map from './map';

const MapContainer = ({ classes, onLoad, result }) => (
  <Map
    result={result}
    onLoad={onLoad}
    containerElement={<Paper className={classes.container}/>}
    mapElement={<div className={classes.map}/>}
  />
);

MapContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  onLoad: PropTypes.func.isRequired,
  result: PropTypes.object
};

MapContainer.defaultProps = {
  result: null
};

export default MapContainer;
