/* eslint-disable no-param-reassign */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { connect } from 'react-redux';
//import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from 'react-geocode';
import Autocomplete from 'react-google-autocomplete';
import { getQuote } from '../actions';
import '../assets/styles/components/Quote.scss';
import carIcon from '../assets/images/car.png';

Geocode.setApiKey('AIzaSyA6goRNCL-UFkReqn_Ll9_lgpZtq5D9Rdw');
Geocode.enableDebug();

const Quote = (props) => {

  const [form, setValues] = useState({
  });
  const handleInput = (event) => {
    console.log(`(Quote.jsx) event es: ${event}`);
    event.target.autocomplete = 'off';
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
  /*
  const handleUpdate = (payload) => {
    setValues({
      ...form,
      origin: payload.origin.value,
      destination: payload.destination.value,
    });
  };
  */
  const handleOrigin = (payload) => {
    setValues({
      ...form,
      origin: payload,
    });
  };
  const handleDestination = (payload) => {
    setValues({
      ...form,
      destination: payload,
    });
  };

  const handleQuote = (event) => {
    event.preventDefault();
    console.log(form);
    //handleUpdate(form);
    props.getQuote(form);
  };

  return (
    <div className='main__container__column'>
      <form onSubmit={handleQuote} >
        <div className='main__container__column--route'>
          <Autocomplete
            name='origin'
            onPlaceSelected={(place) => {
              console.log(place.formatted_address);
              handleOrigin(place.formatted_address);
            }}
            types={['geocode']}
            componentRestrictions={{ country: 'mx' }}
            placeholder='Donde quieres iniciar ...'
            onChange={handleInput}
            autoComplete='off'
          />
          <Autocomplete
            name='destination'
            onPlaceSelected={(place) => {
              console.log(place.formatted_address);
              handleDestination(place.formatted_address);
            }}
            types={['geocode']}
            componentRestrictions={{ country: 'mx' }}
            placeholder='A donde quieres ir ...'
            onChange={handleInput}
            autoComplete='off'
          />
        </div>
        <div className='main__container__column--price'>
          <img src={carIcon} alt='car' />
          <label className='main__container__column--price--title'> Tarifa Estimada </label>
          <label>
         Precio $
            {' '}
            {props.money}
          </label>
          <label>
         Tiempo
            {' '}
            {props.time}
            {' '}
         mins.
          </label>
          <label>
         Distancia:
            {' '}
            {props.distance}
            {' '}
         kms.
          </label>
        </div>

        <div className='main__container__column--order'>
          <input className='main__container__column--order--confirm' type='submit' value='Cotizar' />
        </div>
      </form>
    </div>
  );
};
const mapDispatchToProps = {
  getQuote,
};
const mapStateToProps = (state) => {
  return {
    money: state.money,
    time: state.time,
    distance: state.distance,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quote);

