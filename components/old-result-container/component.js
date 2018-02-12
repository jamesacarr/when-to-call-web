import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import MapContainer from '../map-container';

const ResultContainer = ({ classes, onLoad, result }) => (
  <Grid container className={classes.root}>
    <Grid item xs={12}>
      <MapContainer result={result} onLoad={onLoad}/>
    </Grid>
  </Grid>
);

ResultContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  onLoad: PropTypes.func.isRequired,
  result: PropTypes.object
};

ResultContainer.defaultProps = {
  result: null
};

export default ResultContainer;
