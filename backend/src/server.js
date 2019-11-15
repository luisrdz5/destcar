const express = require('express');
const app = express();

const { config } = require('./config/index');
const destcarAPI = require('./routes/destcarAPI');
const driverAPI = require('./routes/driverAPI');
const userAPI = require('./routes/userAPI');
const paymentsAPI = require('./routes/paymentsAPI');
const tripsAPI = require('./routes/tripsAPI');

app.use(express.json());
tripsAPI(app);
paymentsAPI(app);
driverAPI(app);
userAPI(app);
destcarAPI(app);


app.listen(config.port, function() {  
    console.log(`Listening http://localhost:${config.port}`);
  });