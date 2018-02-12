/* eslint-disable camelcase */

import React from 'react';
import { ListItem, ListItemText } from 'material-ui/List';

const EmptyRow = () => (
  <ListItem dense>
    <ListItemText primary="No Results"/>
  </ListItem>
);

export default EmptyRow;
