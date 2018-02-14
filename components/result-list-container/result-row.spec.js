/* eslint-disable camelcase */

import React from 'react';
import { shallow } from 'enzyme';
import ResultRow from './result-row';

const result = {
  primary: 'Some stuff',
  secondary: 'More stuff',
};
const onClick = () => {};

describe('<ResultRow/>', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<ResultRow result={result} onClick={onClick} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with divider', () => {
    const wrapper = shallow(<ResultRow divider result={result} onClick={onClick} />);
    expect(wrapper).toMatchSnapshot();
  });
});
