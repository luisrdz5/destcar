import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerRequest } from '../actions';
import Footer from '../components/Footer';
import '../assets/styles/containers/Register.scss';

const Register = (props) => {
  const [form, setValues] = useState({
    email: '',
    name: '',
    password: '',
  });
  const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    props.registerRequest(form);
    props.history.push('/');
  };
  return (
    <>
      <section className='register'>
        <section className='register__container'>
          <h2>Regístrate</h2>
          <form action='register__container--form' onSubmit={handleSubmit}>
            <input
              name='name'
              className='input'
              type='text'
              placeholder='Nombre'
              onChange={handleInput}
              required
            />
            <input
              name='password'
              className='input'
              type='text'
              placeholder='Correo'
              onChange={handleInput}
              required
            />
            <input
              name='password'
              className='input'
              type='password'
              placeholder='Contraseña'
              onChange={handleInput}
              required
            />
            <button type='submit' className='button'>Registrarme</button>
          </form>
          <p className='register__container--register'>
            {' '}
            <Link to='/login'>Iniciar Sesión</Link>
          </p>
        </section>
      </section>
      <Footer />
    </>
  );
};
const mapDispatchToProps = {
  registerRequest,
};

export default connect(null, mapDispatchToProps)(Register);

