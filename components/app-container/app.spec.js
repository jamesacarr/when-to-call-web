import React from 'react';
import { shallow } from 'enzyme';
import App from './app';

describe('<App/>', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<App><div>Test</div></App>);
    expect(wrapper).toMatchSnapshot();
  });
});
