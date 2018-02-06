import React from 'react';
import { shallow } from 'enzyme';

import AppWrapper from './component';

describe('<AppWrapper/>', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<AppWrapper><div>Test</div></AppWrapper>);
    expect(wrapper).toMatchSnapshot();
  });
});
