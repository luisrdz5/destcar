import React from 'react';
import Header from '../components/Header';
import MapContainer from '../components/MapContainer';
import Quote from '../components/Quote';
import Footer from '../components/Footer';

import '../assets/styles/App.scss';

const Home = () => {
  return (
    <div className='App'>
      <Header />
      <div className="main__container">
        <Quote />
        <MapContainer />
      </div>
      <Footer />
    </div>
  );
};
export default Home;
