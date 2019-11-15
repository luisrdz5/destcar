const express = require('express');
//const TripsService = require('../services/trips');

const tripsAPI = (app) => {
    const router =  express.Router();
    app.use('/api/trips/', router);
    //const tripsService = new TripsService();
    router.get('/getTrip', (req, res) => {
        res.send(`endpoint getTrip`);
    });
    router.post('/createTrip', (req, res) => {
        res.send(`endpoint createTrip`);
    });
}

module.exports = tripsAPI;