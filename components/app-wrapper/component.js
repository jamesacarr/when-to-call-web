import PropTypes from 'prop-types';

const AppWrapper = ({ children }) => children;

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default AppWrapper;
