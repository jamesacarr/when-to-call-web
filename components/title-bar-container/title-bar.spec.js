import React from 'react';
import { shallow } from 'enzyme';
import TitleBar from './title-bar';

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
      const setVisible = () => {};

      const wrapper = shallow(<TitleBar classes={classes} query={query} setVisible={setVisible}/>);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('.handleChange', () => {
    let wrapper;
    let query;
    let setVisible;

    beforeEach(() => {
      const classes = {
        root: 'root',
        wrapper: 'wrapper',
        search: 'search',
        input: 'input'
      };
      query = jest.fn();
      setVisible = jest.fn();

      wrapper = shallow(<TitleBar classes={classes} query={query} setVisible={setVisible}/>);
    });

    it('sets state value', () => {
      wrapper.instance().handleChange({ target: { value: 'abc' } });
      expect(wrapper.state('value')).toEqual('abc');
    });

    it('calls setVisible with true when value', () => {
      wrapper.instance().handleChange({ target: { value: 'abc' } });
      expect(setVisible).toHaveBeenCalledWith(true);
    });

    it('calls setVisible with false when no value', () => {
      wrapper.instance().handleChange({ target: { value: '' } });
      expect(setVisible).toHaveBeenCalledWith(false);
    });

    it('calls query', () => {
      wrapper.instance().handleChange({ target: { value: 'abc' } });
      expect(query).toHaveBeenCalledWith('abc');
    });

    it('updates the value of the input', () => {
      wrapper.instance().handleChange({ target: { value: 'abc' } });
      wrapper.update();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
