const express = require('express');
const DriversService = require('../services/drivers');
const cacheResponse = require('../utils/cacheResponse');

const {
  SIXTY_MINUTES_IN_SECONDS,
  FIVE_MINUTES_IN_SECONDS
} = require('../utils/time');
const passport = require('passport');


const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');
//JWT strategy
require('../utils/auth/strategies/jwt');



const driverAPI = (app) => {
    const router = express.Router();
    app.use('/api/driver', router);
    const driverService = new DriversService();
    router.get('/', (req, res) => {
      res.send(`API driver v 0.1`);
    });
    router.get('/getDrivers', 
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:drivers']),
    async function(req, res, next) {
      const { tags } = req.query;
      try {
        const drivers = await driverService.getDrivers({ tags });
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS); 
        //throw new Error('Error getting movies');
        res.status(200).json({
          data: drivers,
          message: 'drivers listed'
        });
      } catch (err) {
        next(err);
      }
    });
    router.get('/getDriver/:driverId', 
      passport.authenticate('jwt', { session: false }),
      scopesValidationHandler(['read:drivers']),
      async function(req, res, next){
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS); 
      const { driverId } = req.params;
      try {
        const driver = await driverService.getDriver({driverId});

        res.status(200).json({
          data: driver,
          message: 'driver retrieved'
        });
      } catch (err) {
        next(err);
      }
    });
    router.post('/createdriver', 
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:drivers']),
      async function(req, res, next) {
      const { body: driver }= req;
      try{
        const createdDriverId = await driverService.createDriver({
          driver
        });
        res.status(201).json({
          data: createdDriverId,
          message: 'driver created'
        });
      } catch(err){
        next(err);
      } 
  });
    router.delete('/deletedriver/:driverId', 
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['delete:driver']),
    async function(req, res, next) {
      const { driverId } = req.params;
      try {
        const deletedDriverId = await driverService.deleteDriver({ driverId });
        res.status(200).json({
          data: deletedDriverId,
          message: 'driver deleted'
        });
      } catch (err) {
        next(err);
      }
    });
    router.put('/updatedriver/:driverId', 
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['update:driver']),
    async function(req, res, next) {
      const { driverId } = req.params;
      const { body: driver } = req;
      try {
        const updatedDriverId = await driverService.updateUser({
          driverId,
          driver
        });

        res.status(200).json({
          data: updatedDriverId,
          message: 'driver updated'
        });
      } catch (err) {
        next(err);
      }
    });
};

module.exports = driverAPI;