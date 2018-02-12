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

  onLoad = map => {
    // This is really bad but there's no other way to get the Google Maps object
    this._map = map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  }

  search = async input => {
    const results = await GoogleService.getPlacePredictions(input);
    this.setState({ results });
  }

  selectPlace = async placeId => {
    this.setState({ results: [] });
    const result = await GoogleService.placeDetails(this._map, placeId);
    this.setState({ selectedResult: result });
  }

  render() {
    const { results, selectedResult } = this.state;

    return (
      <div>
        <TitleBar onSearchChange={this.search}/>
        <ResultList results={results} onSelect={this.selectPlace}/>
        <ResultContainer result={selectedResult} onLoad={this.onLoad}/>
      </div>
    );
  }
}

export default AppWrapper;
