import React from 'react';
import PropTypes from 'prop-types';

const AppWrapper = ({ children }) => (
  <div>
    {children}
  </div>
);

AppWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default AppWrapper;
