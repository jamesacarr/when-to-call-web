import React from 'react';
import { shallow } from 'enzyme';

import autocomplete from '../../lib/autocomplete';
import IndexContainer from './component';

jest.mock('../../lib/autocomplete.js', () => jest.fn(() => Promise.resolve([{ id: 'a' }, { id: 'b' }])));

describe('<IndexContainer/>', () => {
  describe('.render', () => {
    it('renders correctly', () => {
      const wrapper = shallow(<IndexContainer><div>Test</div></IndexContainer>);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('.search', () => {
    it('calls autocomplete', () => {
      const wrapper = shallow(<IndexContainer><div>Test</div></IndexContainer>);
      const instance = wrapper.instance();
      instance.search('test');

      expect(autocomplete).toHaveBeenCalledWith('test');
    });

    it('sets state when autocomplete resolve', async () => {
      const wrapper = shallow(<IndexContainer><div>Test</div></IndexContainer>);
      const instance = wrapper.instance();
      await instance.search('test');

      expect(wrapper.state('results')).toEqual([{ id: 'a' }, { id: 'b' }]);
    });
  });
});
