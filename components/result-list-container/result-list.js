import React from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List';
import Paper from 'material-ui/Paper';
import EmptyRow from './empty-row';
import ResultRow from './result-row';

const ResultList = ({ classes, results, loading, visible, selectResult }) => {
  if (loading || !visible) {
    return null;
  }

  return (
    <Paper className={classes.root}>
      <List>
        {results.map((result, index) => (
          <ResultRow key={result.id} result={result} divider={index !== results.length - 1} onClick={() => selectResult(result.id)}/>
        ))}
        {results.length === 0 && <EmptyRow/>}
      </List>
    </Paper>
  );
};

ResultList.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  results: PropTypes.array,
  selectResult: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired
};

ResultList.defaultProps = {
  results: null
};

export default ResultList;
