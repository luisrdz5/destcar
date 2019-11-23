import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import googleIcon from '../assets/images/google.png';
import facebookIcon from '../assets/images/icons8-facebook-nuevo-48.png';
import twitterIcon from '../assets/images/icons8-twitter-16.png';
import { loginUser, loginUserFacebook, loginUserTwitter, loginUserGoogle } from '../actions';
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
    props.loginUser(form, '/');
  };
  const handleFacebook = (event) => {
    event.preventDefault();
    props.loginUserFacebook('/');
  };
  const handleGoogle = (event) => {
    event.preventDefault();
    props.loginUserGoogle('/');
  };
  const handleTwitter = (event) => {
    event.preventDefault();
    props.loginUserTwitter('/');
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
            <button className='login__container_social-media--Google-button' onClick={handleGoogle}>
              <img src={googleIcon} alt='Google' />
            </button>
            <button className='login__container_social-media--facebook-button' onClick={handleFacebook}>
              <img src={facebookIcon} alt='Facebook' />
            </button>
            <button className='login__container_social-media--Twitter-button' onClick={handleTwitter}>
              <img src={twitterIcon} alt='Twitter' />
            </button>
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
  loginUser,
  loginUserFacebook,
  loginUserTwitter,
  loginUserGoogle,
};

export default connect(null, mapDispatchToProps)(Login);
