import React from 'react';
import { connect } from 'react-redux';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
//, withScriptjs,  InfoWindow, DirectionsRenderer

const MyMapComponent = withScriptjs(withGoogleMap((props) => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>
)));
const mapStateToProps = (state) => {
  return {
    defaultLocation: state.defaultLocation,
    zoom: state.zoom,
    country: state.country,
    from: state.from,
    to: state.to,
    route: state.route,
    routeVisible: state.routeVisible,
  };
};

export default connect(mapStateToProps, null)(MyMapComponent);
