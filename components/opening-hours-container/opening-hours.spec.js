import React from 'react';
import { shallow } from 'enzyme';
import OpeningHours from './opening-hours';

describe('OpeningHours', () => {
  const offset = new Date().getTimezoneOffset() * -1;
  const classes = {
    row: 'row',
    cell: 'cell',
  };

  it('renders nothing when no open', () => {
    const data = { close: { day: 0, time: '1700' } };
    const wrapper = shallow(<OpeningHours classes={classes} data={data} offset={offset} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders nothing when no close', () => {
    const data = { open: { day: 0, time: '0900' } };
    const wrapper = shallow(<OpeningHours classes={classes} data={data} offset={offset} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders nothing when no intersection', () => {
    const data = {
      open: { day: 0, time: '1800' },
      close: { day: 0, time: '2000' },
    };
    const wrapper = shallow(<OpeningHours classes={classes} data={data} offset={offset} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const data = {
      open: { day: 0, time: '1000' },
      close: { day: 0, time: '1400' },
    };
    const wrapper = shallow(<OpeningHours classes={classes} data={data} offset={offset} />);

    expect(wrapper).toMatchSnapshot();
  });
});
