/* eslint-disable camelcase */

import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemText } from 'material-ui/List';

const ResultRow = ({ divider, onClick, result: { primary, secondary } }) => (
  <ListItem button dense divider={divider} onClick={onClick}>
    <ListItemText primary={primary} secondary={secondary}/>
  </ListItem>
);

ResultRow.propTypes = {
  divider: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  result: PropTypes.shape({
    primary: PropTypes.string.isRequired,
    secondary: PropTypes.string
  }).isRequired
};

ResultRow.defaultProps = {
  divider: false
};

export default ResultRow;
