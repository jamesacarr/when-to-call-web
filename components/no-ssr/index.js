import { Component } from 'react';
import PropTypes from 'prop-types';

class NoSSR extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  };

  state = {
    canRender: false,
  };

  componentDidMount() {
    this.setState({ canRender: true });
  }

  render() {
    const { children } = this.props;
    const { canRender } = this.state;

    return canRender ? children : null;
  }
}

export default NoSSR;
