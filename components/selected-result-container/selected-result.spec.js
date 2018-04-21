import React from 'react';
import { shallow } from 'enzyme';
import SelectedResult from './selected-result';

describe('SelectedResult', () => {
  const classes = {
    card: 'card',
  };

  it('renders nothing when no result', () => {
    const wrapper = shallow(<SelectedResult classes={classes} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const selected = {
      name: 'Testing',
      address: '123 Fake St, Fakeville',
      openingHours: [
        { close: { day: 1, time: '1700' }, open: { day: 1, time: '0900' } },
        { close: { day: 2, time: '1600' }, open: { day: 2, time: '1000' } },
      ],
      utcOffset: -240,
      phone: '1234 5678',
    };

    const wrapper = shallow(<SelectedResult classes={classes} selected={selected} />);
    expect(wrapper).toMatchSnapshot();
  });
});
