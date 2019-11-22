require('dotenv').config({ path: '../../.env' });

const config = {
  googleAPIKey: process.env.GOOGLEMAPSKEY,
};

module.exports = { config };
