import React from 'react';
import cvvIcon from '../assets/images/cvv.png';
import '../assets/styles/components/PaymentsRegister.scss';

const PaymentsRegister = () => {
  return (
    <section className='payments__register'>
      <form action='payments__register--form'>
        <input className='input' type='text' placeholder='Correo Electronico' />
        <input className='input' type='text' placeholder='Numero de Tarjeta' />
        <div>
          <label className='payments__register--form--expiration'>
            Fecha de Expiración
          </label>
        </div>
        <div className='payments__register--form--expiration--div'>
          <input
            className='payments__register--form--mm'
            type='text'
            placeholder='mm'
            maxLength='2'
          />
          <input
            className='payments__register--form--yy'
            type='text'
            placeholder='yy'
            maxLength='2'
          />
        </div>
        <input className='input' type='text' placeholder='Nombre del titular' />
        <div className='payments__register--form--cvv'>
          <img src={cvvIcon} alt='cvv' />
          <input type='password' placeholder='cvv' maxLength='3' />
        </div>
        <button className='button'>Agregar Forma de Pago</button>
        <button className='button'>Cancelar</button>
      </form>
    </section>
  );
};

export default PaymentsRegister;
