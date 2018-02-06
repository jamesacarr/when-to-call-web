import React from 'react';
import { shallow } from 'enzyme';

import GoogleService from '../../lib/google-service';
import mockPromise from '../../test/mock-promise';
import IndexContainer from './component';

jest.mock('../../lib/google-service');

describe('<IndexContainer/>', () => {
  describe('.render', () => {
    it('renders correctly', () => {
      const wrapper = shallow(<IndexContainer><div>Test</div></IndexContainer>);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('.search', () => {
    let promise;

    beforeEach(() => {
      promise = mockPromise();
      GoogleService.autocomplete = promise;
    });

    it('calls autocomplete', () => {
      const wrapper = shallow(<IndexContainer><div>Test</div></IndexContainer>);
      const instance = wrapper.instance();
      instance.search('test');

      expect(GoogleService.autocomplete).toHaveBeenCalledWith('test');
    });

    it('sets state when autocomplete resolve', async () => {
      const results = [{ id: 'a' }, { id: 'b' }];

      const wrapper = shallow(<IndexContainer><div>Test</div></IndexContainer>);
      const instance = wrapper.instance();
      const promise = instance.search('test');

      GoogleService.autocomplete.resolve(results);
      await promise;

      expect(wrapper.state('results')).toEqual(results);
    });
  });
});
