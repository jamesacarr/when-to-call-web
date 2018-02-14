import React from 'react';
import { shallow } from 'enzyme';
import NoSSR from './component';

describe('</NoSSR>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <NoSSR>
        <div>Test</div>
      </NoSSR>
    );
  });

  it('renders empty when canRender false', () => {
    wrapper.setState({ canRender: false });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders renders children when canRender true', () => {
    wrapper.setState({ canRender: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('sets canRender to false initially', () => {
    const wrapper = shallow(
      <NoSSR>
        <div>Test</div>
      </NoSSR>,
      { disableLifecycleMethods: true }
    );
    expect(wrapper.state('canRender')).toEqual(false);
  });

  it('sets canRender to true after componentDidMount', () => {
    expect(wrapper.state('canRender')).toEqual(true);
  });
});
