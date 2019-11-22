import React from 'react';
import cashIcon from '../assets/images/cash.png';
import ccIcon from '../assets/images/credit-card.png';
import '../assets/styles/components/PaymentsDetails.scss';

const PaymentDetails = () => {
  return (
    <section className='payments__container'>
      <div>
        <label className='payments__container--title'> Payment Methods </label>
      </div>
      <div>
        <label className='payments__container--item'>
          {' '}
          <img src={cashIcon} />
          Cash{' '}
        </label>
      </div>
      <div>
        <label className='payments__container--item'>
          {' '}
          <img src={ccIcon} />
          Credit Card{' '}
        </label>
      </div>
      <div>
        <button className='button'>Agregar Forma de Pago</button>
      </div>
    </section>
  );
};
export default PaymentDetails;
