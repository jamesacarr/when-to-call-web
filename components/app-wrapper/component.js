import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ResultList from '../result-list';
import TitleBar from '../title-bar';
import autocomplete from '../../lib/autocomplete';

class AppWrapper extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired
  }

  state = {
    results: []
  }

  search = async input => {
    const results = await autocomplete(input);
    this.setState({ results });
  }

  render() {
    return (
      <div>
        <TitleBar onSearchChange={this.search}/>
        <ResultList results={this.state.results}/>
        {this.props.children}
      </div>
    );
  }
}

export default AppWrapper;
