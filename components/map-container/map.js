import React from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, Marker, withGoogleMap } from 'react-google-maps';

const defaultCenter = { lat: -27.470125, lng: 153.021072 };

const Map = ({ result, onLoad }) => (
  <GoogleMap ref={onLoad} defaultZoom={8} defaultCenter={defaultCenter}>
    {result && <Marker position={{ lat: result.lat, lng: result.lng }}/>}
  </GoogleMap>
);

Map.propTypes = {
  onLoad: PropTypes.func.isRequired,
  result: PropTypes.object
};

Map.defaultProps = {
  result: null
};

export default withGoogleMap(Map);
