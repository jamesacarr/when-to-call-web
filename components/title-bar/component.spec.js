import React from 'react';
import { shallow } from 'enzyme';

import TitleBar from './component';

// Need to mock out timers here to handle debounce
jest.useFakeTimers();

describe('<TitleBar/>', () => {
  describe('.render', () => {
    it('renders correctly', () => {
      const classes = {
        root: 'root',
        wrapper: 'wrapper',
        search: 'search',
        input: 'input'
      };
      const onSearchChange = () => {};

      const wrapper = shallow(<TitleBar classes={classes} onSearchChange={onSearchChange}/>);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('.handleChange', () => {
    let wrapper;
    let onSearchChange;

    beforeEach(() => {
      const classes = {
        root: 'root',
        wrapper: 'wrapper',
        search: 'search',
        input: 'input'
      };
      onSearchChange = jest.fn();

      wrapper = shallow(<TitleBar classes={classes} onSearchChange={onSearchChange}/>);
    });

    it('sets state value', () => {
      wrapper.instance().handleChange({ target: { value: 'abc' } });
      expect(wrapper.state('value')).toEqual('abc');
    });

    it('calls onSearchChange', () => {
      wrapper.instance().handleChange({ target: { value: 'abc' } });
      jest.runAllTimers(); // Make sure debounced function is called
      expect(onSearchChange).toHaveBeenCalledWith('abc');
    });

    it('updates the value of the input', () => {
      wrapper.instance().handleChange({ target: { value: 'abc' } });
      wrapper.update();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
