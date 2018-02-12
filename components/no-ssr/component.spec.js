import React from 'react';
import { shallow } from 'enzyme';
import NoSSR from './component';

describe('</NoSSR>', () => {
  it('renders empty when canRender false', () => {
    const wrapper = shallow(<NoSSR><div>Test</div></NoSSR>);
    wrapper.setState({ canRender: false });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders renders children when canRender true', () => {
    const wrapper = shallow(<NoSSR><div>Test</div></NoSSR>);
    wrapper.setState({ canRender: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('sets canRender to false initially', () => {
    const wrapper = shallow(<NoSSR><div>Test</div></NoSSR>, { disableLifecycleMethods: true });
    expect(wrapper.state('canRender')).toEqual(false);
  });

  it('sets canRender to true after componentDidMount', () => {
    const wrapper = shallow(<NoSSR><div>Test</div></NoSSR>);
    expect(wrapper.state('canRender')).toEqual(true);
  });
});
