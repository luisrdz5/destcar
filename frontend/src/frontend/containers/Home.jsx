import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MapContainer from '../components/MapContainer';
import Quote from '../components/Quote';
import Footer from '../components/Footer';

import '../assets/styles/App.scss';

const Home = ({ location, country }) => {
  return (
    <div className='App'>
      <Header />
      <div className='main__container'>
        <Quote />
        <MapContainer />
      </div>
      <Footer />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    location: state.location,
    country: state.country,
  };
};

export default connect(mapStateToProps, null)(Home);

