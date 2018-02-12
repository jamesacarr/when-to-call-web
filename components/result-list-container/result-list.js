import React from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List';
import Paper from 'material-ui/Paper';
import ResultRow from './result-row';

const ResultList = ({ classes, results }) => {
  if (results.length === 0) {
    return null;
  }

  return (
    <Paper className={classes.root}>
      <List>
        {results.map((result, index) => (
          <ResultRow key={result.id} result={result} divider={index !== results.length - 1}/>
        ))}
      </List>
    </Paper>
  );
};

ResultList.propTypes = {
  classes: PropTypes.object.isRequired,
  results: PropTypes.array
};

ResultList.defaultProps = {
  results: null
};

export default ResultList;
