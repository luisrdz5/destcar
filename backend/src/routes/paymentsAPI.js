const express = require('express');
const passport = require('passport');


const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');
//JWT strategy
require('../utils/auth/strategies/jwt');

const PaymentsService = require('../services/payments');

const paymentsAPI = (app) => {
    const router =  express.Router();
    app.use('/api/payments/', router);
    const paymentService = new PaymentsService();

    router.get('/getPayments/:idUser', 
      passport.authenticate('jwt', { session: false }),
      scopesValidationHandler(['read:payments']),
      async function(req, res, next) {
        const { idUser } = req.params;
        console.log(idUser);
        try {
          const payments = await paymentService.getPayments({ idUser });
          //throw new Error('Error getting movies');
          res.status(200).json({
            data: payments,
            message: 'payments listed'
          });
        } catch (err) {
          next(err);
        }
      });
    router.get('/getPayment/:idPayment', 
      passport.authenticate('jwt', { session: false }),
      scopesValidationHandler(['read:payments']),
      async function(req, res, next) {
        const { idPayment } = req.params;
        try {
          const payment = await paymentService.getPayment({ idPayment });
          //throw new Error('Error getting movies');
          res.status(200).json({
            data: payment,
            message: 'payment listed'
          });
        } catch (err) {
          next(err);
        }
      });
    router.post('/createPayment', 
      passport.authenticate('jwt', { session: false }),
      scopesValidationHandler(['create:payments']),
      async function(req, res, next) {
        const { body: payment }= req;
        try{
          const createdPaymentId = await paymentService.createPayment({
            payment
          });
          res.status(201).json({
            data: createdPaymentId,
            message: 'payment created'
          });
        } catch(err){
          next(err);
        } 
    });
    router.delete('/deletePayment/:idPayment', 
      passport.authenticate('jwt', { session: false }),
      scopesValidationHandler(['delete:payments']),    
      async function(req, res, next) {
      const { idPayment } = req.params;
      try {
        const payment = await paymentService.deletePayment({ idPayment });
        //throw new Error('Error getting movies');
        res.status(200).json({
          data: payment,
          message: 'payment deleted'
        });
      } catch (err) {
        next(err);
      }
    });
}
module.exports = paymentsAPI;