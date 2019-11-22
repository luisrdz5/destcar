import React from 'react';
import Footer from '../components/Footer';
import '../assets/styles/containers/404.scss';

const NotFound = () => {
    return (
    <>
        <section className="not-found__container">
            <div className="animated not-found">404</div>
            <div className="not-found__text">Pagina no encontrada</div>
        </section>
        <Footer />
    </>
    )
}

export default NotFound;