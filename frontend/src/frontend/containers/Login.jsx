import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import googleIcon from '../assets/images/google.png';
import facebookIcon from '../assets/images/icons8-facebook-nuevo-48.png';
import twitterIcon from '../assets/images/icons8-twitter-16.png';
import { loginRequest } from '../actions';
import '../assets/styles/containers/Login.scss';

const Login = (props) => {
  const [form, setValues] = useState({
    email: '',
  });
  const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    props.loginRequest(form);
    props.history.push('/');
  };

  return (
    <>
      <section className='login'>
        <section className='login__container'>
          <h2>Ingresar</h2>
          <form action='login__container--form' onSubmit={handleSubmit}>
            <input
              name='email'
              className='input'
              type='text'
              placeholder='Correo'
              onChange={handleInput}
            />
            <input
              name='password'
              className='input'
              type='password'
              placeholder='Contraseña'
              onChange={handleInput}
            />
            <button className='button'>Iniciar Sesión</button>
            <div className='login__container--remember-me'>
              <label>
                <input type='checkbox' name='' id='cbox1' value='checkbox' />
                <span>Recuérdame</span>
              </label>
              <a href='/'>Olvide mi Contraseña</a>
            </div>
          </form>
          <section className='login__container_social-media'>
            <div>
              <img src={googleIcon} alt='Google' />
              Inicia Sesión con Google
            </div>
            <div>
              <img src={facebookIcon} alt='Facebook' />
              Inicia Sesión con Facebook
            </div>
            <div>
              <img src={twitterIcon} alt='Twitter' />
              Inicia Sesión con Twitter
            </div>
          </section>
        </section>
        <p className='login__container--register'>
          No tienes ninguna cuenta
          {' '}
          <Link to='/register'>Registrate</Link>
        </p>
      </section>
      <Footer />
    </>
  );
};
const mapDispatchToProps = {
  loginRequest,

};

export default connect(null, mapDispatchToProps)(Login);
