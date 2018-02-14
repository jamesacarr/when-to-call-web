/* eslint-disable camelcase */

import React from 'react';
import { shallow } from 'enzyme';
import EmptyRow from './empty-row';

describe('<EmptyRow/>', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<EmptyRow />);
    expect(wrapper).toMatchSnapshot();
  });
});
