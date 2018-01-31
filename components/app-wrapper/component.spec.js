import React from 'react';
import { shallow } from 'enzyme';
import AppWrapper from './component';

describe('<AppWrapper/>', () => {
  describe('.render', () => {
    it('renders correctly', () => {
      const wrapper = shallow(<AppWrapper title="Testing"><div>Test</div></AppWrapper>);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
