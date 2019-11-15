const express = require('express');
const TripsService = require('../services/trips');

const tripsAPI = (app) => {
    const router =  express.Router();
    app.use('/api/trips/', router);
    const tripsService = new TripsService();
    router.get('/getTrip', async function(req, res, next){
        const { routes } = req.params;
        try {
          const route = await tripsService.getTrip({ routes });
  
          res.status(200).json({
            data: route,
            message: 'route retrieved'
          });
        } catch (err) {
          next(err);
        }
      });
    router.post('/createTrip', (req, res) => {
        res.send(`endpoint createTrip`);
    });
}

module.exports = tripsAPI;