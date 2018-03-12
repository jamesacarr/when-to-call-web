/* eslint-disable camelcase */

import React from 'react';
import { shallow } from 'enzyme';
import ResultList from './result-list';

const results = [
  { id: '123', primary: '1', secondary: '23' },
  { id: '456', primary: '4', secondary: '56' },
  { id: '789', primary: '7', secondary: '89' },
];
const classes = {
  root: 'root',
};
const selectResult = () => {};

describe('<ResultList/>', () => {
  it('renders null when visible false', () => {
    const wrapper = shallow(<ResultList classes={classes} results={results} selectResult={selectResult} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders results when visible and not loading', () => {
    const wrapper = shallow(<ResultList classes={classes} results={results} selectResult={selectResult} visible />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders empty state when no results', () => {
    const wrapper = shallow(<ResultList classes={classes} results={[]} selectResult={selectResult} visible />);
    expect(wrapper).toMatchSnapshot();
  });
});
