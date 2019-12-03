/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Map, Polyline, Marker } from 'google-maps-react';
//import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import { setDestiny, setOrigin, setRoute } from '../actions';
import { mapStyles } from '../assets/styles/MapStyles';

import '../assets/styles/components/MapContainer.scss';
//import pinIcon from '../assets/images/pin.png';

const style = {
  height: '600px',
  width: '50%',
};

class MapContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.route = {};
  }

  calculateDistance = (destination) => {
    const { google } = this.props;
    console.error(`calculando ruta  ${this.route}`);
    const DirectionsService = new google.maps.DirectionsService();
    DirectionsService.route({
      origin: new google.maps.LatLng(this.props.from.lat, this.props.from.lng),
      destination: new google.maps.LatLng(destination.lat, destination.lng),
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.route = result.routes[0].overview_path.map((p) => { return { lat: p.lat(), lng: p.lng() }; });
      } else {
        console.error(`error fetching directions ${result}`);
        console.log(result);
      }
    });
  }

  render() {
    return (
      <div className='main__container__map'>
        <Map
          google={window.google}
          zoom={this.props.zoom}
          initialCenter={this.props.defaultLocation}
          style={style}
          styles={mapStyles}
          onReady={() => this.calculateDistance(this.props.to)}
        >
          {this.props.from && (
            <Marker
              title='Ubicación Actual'
              position={this.props.from}
              name='Current location'
              icon={{
                url: pinIcon,
                anchor: new google.maps.Point(0, 0),
                scaledSize: new google.maps.Size(15, 30),
              }}
            />
          )}
          {this.props.to && (
            <Marker
              title='Destino'
              position={this.props.to}
              name='Current location'
              icon={{
                url: pinIcon,
                anchor: new google.maps.Point(10, 10),
                scaledSize: new google.maps.Size(15, 30),
              }}
            />
          )}
          <Polyline
            visible={this.props.routeVisible}
            options={{
              path: this.route,
              strokeColor: '#ffffff',
              strokeOpacity: 1,
              strokeWeight: 3,
              icons: [{
                offset: '0',
                repeat: '10px',
              }],
            }}
          />
        </Map>

      </div>
    );
  }
}

const mapDispatchToProps = {
  setDestiny,
  setOrigin,
  setRoute,
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
    google: state.google,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);

