import React from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List';
import Paper from 'material-ui/Paper';
import EmptyRow from './empty-row';
import ResultRow from './result-row';

const ResultList = ({ classes, results, visible, selectResult }) => {
  if (!visible) {
    return null;
  }

  const selectResultById = id => () => selectResult(id);

  return (
    <Paper className={classes.root}>
      <List>
        {results.map((result, index) => (
          <ResultRow
            key={result.id}
            result={result}
            divider={index !== results.length - 1}
            onClick={selectResultById(result.id)}
          />
        ))}
        {results.length === 0 && <EmptyRow />}
      </List>
    </Paper>
  );
};

ResultList.propTypes = {
  classes: PropTypes.object.isRequired,
  results: PropTypes.array,
  selectResult: PropTypes.func.isRequired,
  visible: PropTypes.bool,
};

ResultList.defaultProps = {
  results: null,
  visible: false,
};

export default ResultList;
