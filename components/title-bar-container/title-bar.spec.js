import React from 'react';
import { shallow } from 'enzyme';
import TitleBar from './title-bar';

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
      const query = () => {};

      const wrapper = shallow(<TitleBar classes={classes} query={query}/>);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('.handleChange', () => {
    let wrapper;
    let query;

    beforeEach(() => {
      const classes = {
        root: 'root',
        wrapper: 'wrapper',
        search: 'search',
        input: 'input'
      };
      query = jest.fn();

      wrapper = shallow(<TitleBar classes={classes} query={query}/>);
    });

    it('sets state value', () => {
      wrapper.instance().handleChange({ target: { value: 'abc' } });
      expect(wrapper.state('value')).toEqual('abc');
    });

    it('calls query', () => {
      wrapper.instance().handleChange({ target: { value: 'abc' } });
      jest.runAllTimers(); // Make sure debounced function is called
      expect(query).toHaveBeenCalledWith('abc');
    });

    it('updates the value of the input', () => {
      wrapper.instance().handleChange({ target: { value: 'abc' } });
      wrapper.update();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
