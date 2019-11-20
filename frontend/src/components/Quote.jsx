/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import '../assets/styles/components/Quote.scss';
import carIcon from '../assets/images/car.png';

const Quote = () => {
  return (
    <div className='main__container__column'>
      <div className='main__container__column--title' />
      <div className='main__container__column--route'>
        <input type='input' className='main__container__column--route--from' placeholder='Donde quieres iniciar ...' />
        <input type='input' className='main__container__column--route--to' placeholder='A donde quieres ir ...' />
      </div>
      <div className='main__container__column--price'>
        <img src={carIcon} alt="car" />
        <label className='main__container__column--price--title'> Tarifa Estimada </label>
        <label> Precio $55.60</label>
        <label> Tiempo 22 mins. </label>
      </div>
      <div className='main__container__column--order'>
        <input className='main__container__column--order--confirm' type='submit' value='Cotizar ' />
      </div>
    </div>
  );
};
export default Quote;
