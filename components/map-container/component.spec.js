import React from 'react';
import { shallow } from 'enzyme';

import MapContainer from './component';

describe('<MapContainer/>', () => {
  it('renders correctly', () => {
    const classes = {
      container: 'container',
      map: 'map'
    };
    const result = { test: 'stuff' };
    const onLoad = () => {};

    const wrapper = shallow(<MapContainer classes={classes} result={result} onLoad={onLoad}/>);
    expect(wrapper).toMatchSnapshot();
  });
});
