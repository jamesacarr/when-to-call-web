import React from 'react';

import withRoot from '../components/with-root';
import ResultListContainer from '../components/result-list-container';
import SelectedResultContainer from '../components/selected-result-container';
import TitleBarContainer from '../components/title-bar-container';

const Index = () => (
  <div>
    <TitleBarContainer />
    <ResultListContainer />
    <SelectedResultContainer />
  </div>
);

export default withRoot(Index);
