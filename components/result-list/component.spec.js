/* eslint-disable camelcase */

import React from 'react';
import { shallow } from 'enzyme';

import ResultList from './component';

const results = [
  { place_id: '123', structured_formatting: { main_text: '1', secondary_text: '23' } },
  { place_id: '456', structured_formatting: { main_text: '4', secondary_text: '56' } },
  { place_id: '789', structured_formatting: { main_text: '7', secondary_text: '89' } }
];

const classes = {
  root: 'root'
};

describe('<ResultList/>', () => {
  describe('.render', () => {
    it('renders correctly with result', () => {
      const wrapper = shallow(<ResultList classes={classes} results={results}/>);
      expect(wrapper).toMatchSnapshot();
    });

    it('renders null with empty results', () => {
      const wrapper = shallow(<ResultList classes={classes} results={[]}/>);
      expect(wrapper).toMatchSnapshot();
    });

    it('renders null with null results', () => {
      const wrapper = shallow(<ResultList classes={classes} results={null}/>);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
