import React from 'react';
import '../assets/styles/components/Header.scss';

const Header = () => (
  <header ClassName='header'>
    <div ClassName='header__burguer__menu'>
      <input type='checkbox' />
      <span />
      <span />
      <span />
      <div ClassName='header__burguer__menu--profile'>
        <div ClassName='header__burguer__menu--profile--photo'>
          <div ClassName='header__burguer__menu--profile--container'>
            <img ClassName='header__burguer__menu--profile--photo--img' src='../assets/images/perfil.jpg' alt='User' />
            <div ClassName='header__burguer__menu--profile--photo--rating'>
4.2
              {' '}
              <img ClassName='header__burguer__menu--profile--photo--star' src='../assets/images/star.png' alt='rating' />
            </div>
          </div>
          <label ClassName='header__burguer__menu--profile--photo--name'>Nombre del Usuario</label>
          <label ClassName='header__burguer__menu--profile--photo--id'>@nombreusuario</label>
        </div>
      </div>
      <ul ClassName='header__burguer__menu--options'>
        <li><a href='./'>Cuenta</a></li>
        <li><a href='./'>Reserva</a></li>
        <li><a href='./'>Pagos</a></li>
        <li><a href='./'>Contáctanos</a></li>
        <li><a href='./'>Acerca de Nosotros</a></li>
        <li><a href='./'>Cerrar Sesion</a></li>
      </ul>

    </div>
    <div ClassName='header__img--div'>
      <img ClassName='header__img' src='../assets/images/logo-vertical.png' alt='logo' />
    </div>
    <div ClassName='header__actions'>
      <ul ClassName='header__actions--options'>
        <li><a href='./'>Reserva</a></li>
        <li><a href='./'>Pagos</a></li>
        <li><a href='./'>Contáctanos</a></li>
        <li><a href='./'>Acerca de Nosotros</a></li>
      </ul>
    </div>
    <div ClassName='header__menu'>
      <div ClassName='header__menu--profile'>
        <img ClassName='header__menu' src='../assets/images/user-icon.png' alt='User' />
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
