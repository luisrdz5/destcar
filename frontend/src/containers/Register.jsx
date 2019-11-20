import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import '../assets/styles/containers/Register.scss';

const Register = () => {
  return (
    <>
      <section className="register">
        <section className="register__container">
          <h2>Regístrate</h2>
          <form action="register__container--form">
            <input className="input" type="text" placeholder="Nombre" />
            <input className="input" type="text" placeholder="Correo" />
            <input className="input" type="password" placeholder="Contraseña" />
            <button className="button">Registrarme</button>
          </form>
          <p className="register__container--register">
            {" "}
            <Link to="/login">Iniciar Sesión</Link>
          </p>
        </section>
      </section>
      <Footer />
    </>
  );
};
export default Register;
