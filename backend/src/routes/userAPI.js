const express = require('express');
const UserService = require('../services/users');
const cacheResponse = require('../utils/cacheResponse.js');
const {
  SIXTY_MINUTES_IN_SECONDS,
  FIVE_MINUTES_IN_SECONDS
} = require('../utils/time');
const passport = require('passport');

const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');
//JWT strategy
require('../utils/auth/strategies/jwt');


const userAPI = (app) => {
    const router = express.Router();
    app.use('/api/user/', router);
    const userService = new UserService();

    router.get('/getusers', 
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:users']),
    async function(req, res, next) {
      const { tags } = req.query;
      try {
        const users = await userService.getUsers({ tags });
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS); 
        //throw new Error('Error getting movies');
        res.status(200).json({
          data: users,
          message: 'users listed'
        });
      } catch (err) {
        next(err);
      }
    });
    router.get('/getUser/:userId', 
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:users']),
    async function(req, res, next){
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS); 
      const { userId } = req.params;
      try {
        const user = await userService.getUser({ userId });

        res.status(200).json({
          data: user,
          message: 'user retrieved'
        });
      } catch (err) {
        next(err);
      }
    });

    router.post('/createuser', 
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['create:users']),
    async function(req, res, next) {
        const { body: user }= req;
        try{
          const createdUserId = await userService.createUser({
            user
          });
          res.status(201).json({
            data: createdUserId,
            message: 'user created'
          });
        } catch(err){
          next(err);
        } 
    });
    router.delete('/deleteuser/:userId', 
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['delete:users']),
    async function(req, res, next) {
      const { userId } = req.params;
      try {
        const deletedUserId = await userService.deleteUser({ userId });
        res.status(200).json({
          data: deletedUserId,
          message: 'user deleted'
        });
      } catch (err) {
        next(err);
      }
    });
    router.put('/updateuser/:userId', 
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['update:users']),
    async function(req, res, next) {
      const { userId } = req.params;
      const { body: user } = req;
      try {
        const updatedUserId = await userService.updateUser({
          userId,
          user
        });

        res.status(200).json({
          data: updatedUserId,
          message: 'user updated'
        });
      } catch (err) {
        next(err);
      }
    });
};
module.exports = userAPI;