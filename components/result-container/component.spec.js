import React from 'react';
import { shallow } from 'enzyme';

import ResultContainer from './component';

describe('<ResultContainer/>', () => {
  it('renders correctly', () => {
    const classes = {
      root: 'root'
    };
    const result = { test: 'stuff' };

    const wrapper = shallow(<ResultContainer classes={classes} result={result}/>);
    expect(wrapper).toMatchSnapshot();
  });
});
