import React from 'react';
import { shallow } from 'enzyme';

import autocomplete from '../../lib/autocomplete';
import AppWrapper from './component';

jest.mock('../../lib/autocomplete.js', () => jest.fn(() => Promise.resolve([{ id: 'a' }, { id: 'b' }])));

describe('<AppWrapper/>', () => {
  describe('.render', () => {
    it('renders correctly', () => {
      const wrapper = shallow(<AppWrapper><div>Test</div></AppWrapper>);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('.search', () => {
    it('calls autocomplete', () => {
      const wrapper = shallow(<AppWrapper><div>Test</div></AppWrapper>);
      const instance = wrapper.instance();
      instance.search('test');

      expect(autocomplete).toHaveBeenCalledWith('test');
    });

    it('sets state when autocomplete resolve', async () => {
      const wrapper = shallow(<AppWrapper><div>Test</div></AppWrapper>);
      const instance = wrapper.instance();
      await instance.search('test');

      expect(wrapper.state('results')).toEqual([{ id: 'a' }, { id: 'b' }]);
    });
  });
});
