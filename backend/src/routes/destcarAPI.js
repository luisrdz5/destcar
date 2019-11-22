const express = require('express');
const DestcarService = require('../services/destcar');
const passport = require('passport');


const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');
//JWT strategy
require('../utils/auth/strategies/jwt');

const destcarAPI = (app) => {
  const router = express.Router();
  app.use('/api/', router);
  const destcarService =  new DestcarService();
  router.get('/', (req, res) => {
    res.send(`API v 0.11`);
  });
  router.get('/getquotes/:country', 
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:quotes']),
    async function(req, res, next) {
    const { country } = req.params;
    try {
      const quotes = await destcarService.getQuotes(country);

      res.status(200).json({
        data: quotes,
        message: 'quotes listed'
      });
    } catch (err) {
      next(err);
    }
  });
  router.get('*', (req, res) => {
    res.status(404).send('Error 404');
  });
};
module.exports = destcarAPI;
