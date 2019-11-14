const express = require('express');

const driverAPI = (app) => {
    const router = express.Router();
    app.use('/api/driver', router);
    router.get('/', (req, res) => {
      res.send(`API driver v 0.1`);
    });
    router.get('/getDrivers', (req, res) => {
      res.send(`endpoint getDrivers`);
    });
    router.get('/getDriver', (req, res) => {
      res.send(`endpoint getDriver`);
    });
}

module.exports = driverAPI;