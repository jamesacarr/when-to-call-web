import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List';
import Paper from 'material-ui/Paper';

import ResultRow from './result-row';

class ResultList extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    results: PropTypes.PropTypes.array
  }

  static defaultProps = {
    results: null
  }

  render() {
    const { classes, results } = this.props;

    if (!results || results.length === 0) {
      return null;
    }

    return (
      <Paper className={classes.root}>
        <List>
          {results.map((result, index) => <ResultRow key={result.place_id} result={result} divider={index !== results.length - 1}/>)}
        </List>
      </Paper>
    );
  }
}

export default ResultList;
