import React from 'react';
import { shallow } from 'enzyme';
import TitleBar from './title-bar';

const classes = {
  root: 'root',
  wrapper: 'wrapper',
  search: 'search',
  input: 'input',
};

describe('<TitleBar/>', () => {
  describe('.render', () => {
    const performQuery = () => {};
    const setVisible = () => {};

    it('renders correctly when not loading', () => {
      const wrapper = shallow(<TitleBar classes={classes} performQuery={performQuery} setVisible={setVisible} />);
      expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly when loading', () => {
      const wrapper = shallow(
        <TitleBar classes={classes} performQuery={performQuery} setVisible={setVisible} loading />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('.handleChange', () => {
    let wrapper;
    let performQuery;
    let setVisible;

    beforeEach(() => {
      performQuery = jest.fn();
      setVisible = jest.fn();

      wrapper = shallow(<TitleBar classes={classes} performQuery={performQuery} setVisible={setVisible} />);
      wrapper.instance().handleChange({ target: { value: 'abc' } });
    });

    it('sets query', () => {
      expect(wrapper.state('query')).toEqual('abc');
    });

    it('calls performQuery', () => {
      expect(performQuery).toHaveBeenCalledWith('abc');
    });
  });
});
