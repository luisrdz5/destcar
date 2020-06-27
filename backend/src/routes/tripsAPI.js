const express = require('express');
const TripsService = require('../services/trips');
const passport = require('passport');


const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');
//JWT strategy
require('../utils/auth/strategies/jwt');

const tripsAPI = (app) => {
    const router =  express.Router();
    app.use('/api/trips/', router);
    const tripsService = new TripsService();


    router.get('/getTrip', 
      passport.authenticate('jwt', { session: false }),
      scopesValidationHandler(['read:trips']),
      async function(req, res, next){
        //console.log(`tripsAPI.js req.body: ${JSON.stringify(req.body)}`);
        const { body: routes } = req;
        try {
          //console.log(`tripsAPI.js routes:  ${JSON.stringify(routes)}`);
          const route = await tripsService.getTrip(routes);
          res.status(200).json({
            data: route,
            message: 'route retrieved'
          });
        } catch (err) {
          next(err);
        }
      });


    router.get('/createTrip', 
      passport.authenticate('jwt', { session: false }),
      scopesValidationHandler(['create:trips']),
      (req, res) => {
        res.send(`endpoint createTrip`);
    });
}

module.exports = tripsAPI;