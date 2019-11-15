const express = require('express');
const app = express();

const { config } = require('./config/index');
const destcarAPI = require('./routes/destcarAPI');
const driverAPI = require('./routes/driverAPI');
const userAPI = require('./routes/userAPI');
const paymentsAPI = require('./routes/paymentsAPI');

app.use(express.json());

paymentsAPI(app);
driverAPI(app);
userAPI(app);
destcarAPI(app);


app.listen(config.port, function() {  
    console.log(`Listening http://localhost:${config.port}`);
  });