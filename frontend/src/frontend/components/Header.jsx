import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import gravatar from '../utils/gravatar';
import '../assets/styles/components/Header.scss';
import { logoutUser } from '../actions';
import perfilIcon from '../assets/images/perfil.jpg';
import starIcon from '../assets/images/star.png';
import logoVertical from '../assets/images/logo-vertical.png';
import userIcon from '../assets/images/user-icon.png';

const Header = (props) => {
  const { user } = props;
  const hasUser = user;
  const handleLogout = () => {
    props.logoutUser({});
    window.location.href = '/login';
  };
  return (
    <header className='header'>
      <div className='header__burguer__menu'>
        <input type='checkbox' />
        <span />
        <span />
        <span />
        <div className='header__burguer__menu--profile'>
          <div className='header__burguer__menu--profile--photo'>
            <div className='header__burguer__menu--profile--container'>
              { hasUser ?
                (<img className='header__burguer__menu--profile--photo--img' src={gravatar(user.email)} alt={user.email} />) :
                (<img className='header__burguer__menu--profile--photo--img' src={perfilIcon} alt='User' />)}
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
          <li><Link to='/'>Cuenta</Link></li>
          <li><Link to='/'>Reserva</Link></li>
          <li><Link to='/'>Pagos</Link></li>
          <li><Link to='/'>Contáctanos</Link></li>
          <li><Link to='/'>Acerca de Nosotros</Link></li>
          {hasUser ? (
            <li>
              <a href='#logout' onClick={handleLogout}> Cerrar Sesión </a>
              {' '}
            </li>
          ) : (
            <li>
              <Link to='/login'>
                Iniciar Sesion
              </Link>
            </li>
          )}
        </ul>

      </div>
      <div className='header__img--div'>
        <img className='header__img' src={logoVertical} alt='logo' />
      </div>
      <div className='header__actions'>
        <ul className='header__actions--options'>
          <li><Link to='/'>Reserva</Link></li>
          <li><Link to='/'>Pagos</Link></li>
          <li><Link to='/'>Contáctanos</Link></li>
          <li><Link to='/'>Acerca de Nosotros</Link></li>
        </ul>
      </div>
      <div className='header__menu'>
        <div className='header__menu--profile'>
          { hasUser ?
            <img src={gravatar(user.email)} alt={user.email} /> :
            <img className='header__menu' src={userIcon} alt='User' />}
          <p> Perfil </p>
        </div>
        <ul>
          {hasUser ? (
            <li>
              <a href='#logout' onClick={handleLogout}> Cerrar Sesión </a>
              {' '}
            </li>
          ) : (
            <li>
              <Link to='/login'>
                Iniciar Sesion
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = {
  logoutUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
