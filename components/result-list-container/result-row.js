/* eslint-disable camelcase */

import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemText } from 'material-ui/List';

const ResultRow = ({ divider, result: { primary, secondary } }) => (
  <ListItem button dense divider={divider}>
    <ListItemText primary={primary} secondary={secondary}/>
  </ListItem>
);

ResultRow.propTypes = {
  divider: PropTypes.bool,
  result: PropTypes.shape({
    primary: PropTypes.string.isRequired,
    secondary: PropTypes.string
  }).isRequired
};

ResultRow.defaultProps = {
  divider: false
};

export default ResultRow;
