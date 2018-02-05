import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TitleBar from '../title-bar';
import autocomplete from '../../lib/autocomplete';

class AppWrapper extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired
  }

  search = async input => {
    const results = await autocomplete(input);
    console.log(results);
  }

  render() {
    return (
      <div>
        <TitleBar onSearchChange={this.search}/>
        {this.props.children}
      </div>
    );
  }
}

export default AppWrapper;
