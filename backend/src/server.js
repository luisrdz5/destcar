const express = require('express');
const app = express();

const { config } = require('./config/index');
const destcarAPI = require('./routes/destcar');
const driverAPI = require('./routes/driverAPI');
const userAPI = require('./routes/userAPI');

app.use(express.json());

driverAPI(app);
userAPI(app);
destcarAPI(app);


app.listen(config.port, function() {  
    console.log(`Listening http://localhost:${config.port}`);
  });