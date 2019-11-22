import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, Polyline, Marker, GoogleApiWrapper } from 'google-maps-react';
import { setDestiny, setOrigin } from '../actions';
import { mapStyles } from '../assets/styles/MapStyles';
import '../assets/styles/components/MapContainer.scss';
import pinIcon from '../assets/images/pin.png';

const style = {
  height: '600px',
  width: '50%',
}

class MapContainer extends Component {
  render() {
    return (
      <div className='main__container__map'>
        <Map
          google={this.props.google}
          zoom={this.props.zoom}
          initialCenter={this.props.defaultLocation}
          style={style}
          styles={mapStyles}
        >
          {this.props.from &&(
            <Marker
              title={'Ubicación Actual'}
              position={this.props.from}
              name='Current location'
              icon={{
                url: pinIcon,
                anchor: new google.maps.Point(10, 10),
                scaledSize: new google.maps.Size(15, 20)
              }}
            />
          )}
          {this.props.to &&(
            <Marker
              title={'Destino'}
              position={this.props.to}
              name='Current location'
              icon={{
                url: pinIcon,
                anchor: new google.maps.Point(10, 10),
                scaledSize: new google.maps.Size(15, 20)
              }}
            />
          )}
            <Polyline
              options={{ 
                path: this.props.route,
                strokeColor: '#ffffff',
                strokeOpacity: 1,
                strokeWeight: 6,
                icons: [{
                    offset: '0',
                    repeat: '10px'
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
}
const mapStateToProps = state => {
  return {
    defaultLocation: state.defaultLocation,
    zoom: state.zoom,
    country: state.country,
    from: state.from,
    to: state.to,
    route: state.route,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({
  //apiKey: config.googleAPIKey,
  apiKey: 'AIzaSyCmjvkXB_DMnBUNwxQztLMStyQmA_szbNw',
})(MapContainer))

