import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import PaymentsRegister from '../components/PaymentsRegister';
import PaymentsDetails from '../components/PaymentsDetails';
import '../assets/styles/containers/Payments.scss';

const Payments = () => {
    return (
        <>
            <Header /> 
            <section className="payments">
                <PaymentsDetails />
                <PaymentsRegister />
            </section>
            <Footer />
        </>
    )
}

export default Payments;
