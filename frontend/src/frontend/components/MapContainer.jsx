/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { Map, Polyline, Marker, GoogleApiWrapper } from 'google-maps-react';

import { setDestiny, setOrigin } from '../actions';
//import { mapStyles } from '../assets/styles/MapStyles';
import '../assets/styles/components/MapContainer.scss';
//import pinIcon from '../assets/images/pin.png';
import MyMapComponent from './Map';

/*
const style = {
  height: '600px',
  width: '50%',
};
*/

class MapContainer extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className='main__container__map'>
        <MyMapComponent
          googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places'
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: '400px' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  setDestiny,
  setOrigin,
};
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
export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);

