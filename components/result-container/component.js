import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';

import MapContainer from '../map-container';

class ResultContainer extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    result: PropTypes.object
  }

  static defaultProps = {
    result: null
  }

  onLoad = map => {
    this._map = map;
  }

  render() {
    const { classes, result } = this.props;

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <MapContainer result={result} onLoad={this.onLoad}/>
        </Grid>
      </Grid>
    );
  }
}

export default ResultContainer;
