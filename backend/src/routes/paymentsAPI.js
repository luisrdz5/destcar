const express = require('express');

const PaymentsService = require('../services/payments');

const paymentsAPI = (app) => {
    const router =  express.Router();
    app.use('/api/payments/', router);
    const paymentService = new PaymentsService();

    router.get('/getPayments/:idUser', async function(req, res, next) {
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
    router.get('/getPayment/:idPayment', async function(req, res, next) {
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
    router.post('/createPayment', async function(req, res, next) {
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
    router.delete('/deletePayment/:idPayment', async function(req, res, next) {
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