import React, { Component } from 'react';

import ResultList from '../result-list';
import TitleBar from '../title-bar';
import autocomplete from '../../lib/autocomplete';

class AppWrapper extends Component {
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
      </div>
    );
  }
}

export default AppWrapper;
