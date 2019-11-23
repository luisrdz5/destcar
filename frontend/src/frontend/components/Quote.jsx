/* eslint-disable react/no-this-in-sfc */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getQuote } from '../actions';
import '../assets/styles/components/Quote.scss';
import carIcon from '../assets/images/car.png';

const Quote = (props) => {

  const [form, setValues] = useState({
  });
  const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleQuote = (event) => {
    event.preventDefault();
    props.getQuote(form);
  };

  return (
    <div className='main__container__column'>
      <form onSubmit={handleQuote}>
        <div className='main__container__column--route'>
          <input
            name='origin'
            type='input'
            className='main__container__column--route--from'
            placeholder='Donde quieres iniciar ...'
            onChange={handleInput}
          />
          <input
            name='destination'
            type='input'
            className='main__container__column--route--to'
            placeholder='A donde quieres ir ...'
            onChange={handleInput}
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

