import React from 'react';
import PropTypes from 'prop-types';
import { DateTime, Interval } from 'luxon';
import { TableCell, TableRow } from 'material-ui/Table';

const LOCAL_HOURS = Interval.fromDateTimes(DateTime.fromISO('08:30'), DateTime.fromISO('17:00'));
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const insert = (original, index, str) => original.slice(0, index) + str + original.slice(index);
const toDate = (str, offset) =>
  DateTime.fromISO(`${DateTime.local().toISODate()}T${insert(str, 2, ':')}`, { zone: offset });

const OpeningHours = ({ data: { open, close }, offset, classes }) => {
  if (!open || !close) {
    return null;
  }

  const day = DAYS[open.day];
  const hours = Interval.fromDateTimes(toDate(open.time, offset), toDate(close.time, offset));
  const intersection = hours.intersection(LOCAL_HOURS);

  if (!intersection) {
    return null;
  }

  return (
    <TableRow className={classes.row}>
      <TableCell padding="none" className={classes.cell}>
        {day}
      </TableCell>
      <TableCell padding="none" className={classes.cell}>
        {intersection.start.toLocal().toFormat('hh:mma')}
        {' - '}
        {intersection.end.toLocal().toFormat('hh:mma')}
      </TableCell>
    </TableRow>
  );
};

const timeShape = PropTypes.shape({
  day: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
});

OpeningHours.propTypes = {
  data: PropTypes.shape({
    open: timeShape,
    close: timeShape,
  }).isRequired,
  offset: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
};

export default OpeningHours;
