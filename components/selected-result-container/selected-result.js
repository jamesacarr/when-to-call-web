import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Table, { TableBody } from 'material-ui/Table';
import Typography from 'material-ui/Typography';

import OpeningHours from '../opening-hours-container';

const SelectedResult = ({ selected, classes }) => {
  if (!selected) {
    return null;
  }

  const { name, address, openingHours, phone, utcOffset } = selected;
  return (
    <Card className={classes.card}>
      <CardHeader title={name} subheader={address} />
      <CardContent>
        {phone && (
          <Typography gutterBottom variant="body1">
            {phone}
          </Typography>
        )}

        <Typography variant="body2">Call Between</Typography>
        <Table>
          <TableBody>
            {/* eslint-disable-next-line react/no-array-index-key */}
            {openingHours.map((hours, index) => <OpeningHours key={index} data={hours} offset={utcOffset} />)}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

SelectedResult.propTypes = {
  classes: PropTypes.object.isRequired,
  selected: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    openingHours: PropTypes.array.isRequired,
    utcOffset: PropTypes.number.isRequired,
    phone: PropTypes.string,
  }),
};

SelectedResult.defaultProps = {
  selected: null,
};

export default SelectedResult;
