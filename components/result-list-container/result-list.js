import React from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List';
import Paper from 'material-ui/Paper';
import EmptyRow from './empty-row';
import ResultRow from './result-row';

const ResultList = ({ classes, results, loading, visible }) => {
  if (loading || !visible) {
    return null;
  }

  return (
    <Paper className={classes.root}>
      <List>
        {results.map((result, index) => (
          <ResultRow key={result.id} result={result} divider={index !== results.length - 1}/>
        ))}
        {results.length === 0 && <EmptyRow/>}
      </List>
    </Paper>
  );
};

ResultList.propTypes = {
  classes: PropTypes.object.isRequired,
  results: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired
};

ResultList.defaultProps = {
  results: null
};

export default ResultList;
