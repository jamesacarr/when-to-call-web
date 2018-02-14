import React from 'react';

import withRoot from '../components/with-root';
import ResultListContainer from '../components/result-list-container';
import TitleBarContainer from '../components/title-bar-container';

const Index = () => (
  <div>
    <TitleBarContainer />
    <ResultListContainer />
  </div>
);

export default withRoot(Index);
