/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { connect } from 'react-redux';
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
    //console.log(`(Quote.jsx) event es: ${event}`);
    event.target.autocomplete = 'off';
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
  const handleModal = () => {
    const modal = document.querySelector('.main__container__column--order-modal');
    //console.log(`(quote.jsx) handleModal ${JSON.stringify(modal)}`);
    modal.classList.toggle('show-modal');
  };
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
          {!props.routeVisible && (
            <input className='main__container__column--order--confirm' id='cotizar' type='submit' value='Cotizar' />
          )}
          {props.routeVisible && (
            <input className='main__container__column--order--confirm' id='solicitar' type='button' value='Solicitar Conductor' onClick={handleModal} />
          )}
        </div>
        <div className='main__container__column--order-modal'>
          <div className='main__container__column--order-modal-content'>
            <span className='main__container__column--order-close-button' onClick={handleModal} >&times;</span>
            <h1>Lo Sentimos no tenemos conductores disponibles en tu zona</h1>
          </div>
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
    routeVisible: state.routeVisible,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quote);

