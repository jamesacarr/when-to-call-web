import React, { Component } from 'react';

import ResultContainer from '../result-container';
import ResultList from '../result-list';
import TitleBar from '../title-bar';
import GoogleService from '../../lib/google-service';

class AppWrapper extends Component {
  state = {
    results: [],
    selectedResult: null
  }

  search = async input => {
    const results = await GoogleService.autocomplete(input);
    this.setState({ results });
  }

  render() {
    const { results, selectedResult } = this.state;

    return (
      <div>
        <TitleBar onSearchChange={this.search}/>
        <ResultList results={results}/>
        <ResultContainer result={selectedResult}/>
      </div>
    );
  }
}

export default AppWrapper;
