const express = require('express');
const app = express();

const { config } = require('./config/index');
const destcarAPI = require('./routes/destcar');

destcarAPI(app);

app.listen(config.port, function() {
  
    console.log(`Listening http://localhost:${config.port}`);
  });