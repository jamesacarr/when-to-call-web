/* eslint-disable camelcase */

import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemText } from 'material-ui/List';

const ResultRow = ({ divider, result: { structured_formatting: { main_text, secondary_text } } }) => (
  <ListItem dense divider={divider}>
    <ListItemText primary={main_text} secondary={secondary_text}/>
  </ListItem>
);

ResultRow.propTypes = {
  divider: PropTypes.bool,
  result: PropTypes.shape({
    structured_formatting: PropTypes.shape({
      main_text: PropTypes.string.isRequired,
      secondary_text: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

ResultRow.defaultProps = {
  divider: false
};

export default ResultRow;
