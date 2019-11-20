import React from 'react';
import '../assets/styles/components/Header.scss';
import perfilIcon from '../assets/images/perfil.jpg';
import starIcon from '../assets/images/star.png';
import logoVertical from '../assets/images/logo-vertical.png';
import userIcon from '../assets/images/user-icon.png';

const Header = () => (
  <header className='header'>
    <div className='header__burguer__menu'>
      <input type='checkbox' />
      <span />
      <span />
      <span />
      <div className='header__burguer__menu--profile'>
        <div className='header__burguer__menu--profile--photo'>
          <div className='header__burguer__menu--profile--container'>
            <img className='header__burguer__menu--profile--photo--img' src={perfilIcon} alt='User' />
            <div className='header__burguer__menu--profile--photo--rating'>
4.2
              {' '}
              <img className='header__burguer__menu--profile--photo--star' src={starIcon} alt='rating' />
            </div>
          </div>
          <label className='header__burguer__menu--profile--photo--name'>Nombre del Usuario</label>
          <label className='header__burguer__menu--profile--photo--id'>@nombreusuario</label>
        </div>
      </div>
      <ul className='header__burguer__menu--options'>
        <li><a href='./'>Cuenta</a></li>
        <li><a href='./'>Reserva</a></li>
        <li><a href='./'>Pagos</a></li>
        <li><a href='./'>Contáctanos</a></li>
        <li><a href='./'>Acerca de Nosotros</a></li>
        <li><a href='./'>Cerrar Sesion</a></li>
      </ul>

    </div>
    <div className='header__img--div'>
      <img className='header__img' src={logoVertical} alt='logo' />
    </div>
    <div className='header__actions'>
      <ul className='header__actions--options'>
        <li><a href='./'>Reserva</a></li>
        <li><a href='./'>Pagos</a></li>
        <li><a href='./'>Contáctanos</a></li>
        <li><a href='./'>Acerca de Nosotros</a></li>
      </ul>
    </div>
    <div className='header__menu'>
      <div className='header__menu--profile'>
        <img className='header__menu' src={userIcon} alt='User' />
        <p> Perfil </p>
      </div>
      <ul>
        <li><a href='./'>Cuenta</a></li>
        <li><a href='./'>Cerrar Sesion</a></li>
      </ul>
    </div>
  </header>
);

export default Header;
