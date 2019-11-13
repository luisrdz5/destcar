const express = require('express');

const destcarAPI = (app) => {
  const router = express.Router();
  app.use('/api/', router);
  router.get('/', (req, res) => {
    res.send(`API v 0.1`);
  });
  router.get('/getUser', (req, res) => {
    res.send(`endpoint getUser`);
  });
  router.get('/createUser', (req, res) => {
    res.send(`endpoint createUser`);
  });
  router.get('/getDrivers', (req, res) => {
    res.send(`endpoint getDrivers`);
  });
  router.get('/getDriver', (req, res) => {
    res.send(`endpoint getDriver`);
  });
  router.get('/getTrip', (req, res) => {
    res.send(`endpoint getTrip`);
  });
  router.get('/getquotes', (req, res) => {
    res.send(`endpoint getquotes`);
  });
  router.get('/createTrip', (req, res) => {
    res.send(`endpoint createTrip`);
  });
  router.get('/sendPayment', (req, res) => {
    res.send(`endpoint sendPayment`);
  });






  router.get('*', (req, res) => {
    res.status(404).send('Error 404');
  });
};
module.exports = destcarAPI;
