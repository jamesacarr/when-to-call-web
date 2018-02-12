import React from 'react';
import { shallow } from 'enzyme';
import TitleBar from './title-bar';

describe('<TitleBar/>', () => {
  describe('.render', () => {
    it('renders correctly when not loading', () => {
      const classes = {
        root: 'root',
        wrapper: 'wrapper',
        search: 'search',
        input: 'input'
      };
      const performQuery = () => {};
      const setVisible = () => {};

      const wrapper = shallow(<TitleBar classes={classes} query="" performQuery={performQuery} setVisible={setVisible} loading={false}/>);
      expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly when loading', () => {
      const classes = {
        root: 'root',
        wrapper: 'wrapper',
        search: 'search',
        input: 'input'
      };
      const performQuery = () => {};
      const setVisible = () => {};

      const wrapper = shallow(<TitleBar classes={classes} query="" performQuery={performQuery} setVisible={setVisible} loading/>);
      expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly when supplied query', () => {
      const classes = {
        root: 'root',
        wrapper: 'wrapper',
        search: 'search',
        input: 'input'
      };
      const performQuery = () => {};
      const setVisible = () => {};

      const wrapper = shallow(<TitleBar classes={classes} query="testing" performQuery={performQuery} setVisible={setVisible} loading/>);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('.handleChange', () => {
    let wrapper;
    let performQuery;
    let setVisible;

    beforeEach(() => {
      const classes = {
        root: 'root',
        wrapper: 'wrapper',
        search: 'search',
        input: 'input'
      };
      performQuery = jest.fn();
      setVisible = jest.fn();

      wrapper = shallow(<TitleBar classes={classes} query="" performQuery={performQuery} setVisible={setVisible} loading={false}/>);
    });

    it('calls setVisible with true when value', () => {
      wrapper.instance().handleChange({ target: { value: 'abc' } });
      expect(setVisible).toHaveBeenCalledWith(true);
    });

    it('calls setVisible with false when no value', () => {
      wrapper.instance().handleChange({ target: { value: '' } });
      expect(setVisible).toHaveBeenCalledWith(false);
    });

    it('calls performQuery', () => {
      wrapper.instance().handleChange({ target: { value: 'abc' } });
      expect(performQuery).toHaveBeenCalledWith('abc');
    });
  });
});
