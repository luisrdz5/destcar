require('dotenv').config({ path: '../../.env' });

const config = {
  googleAPIKey: process.env.GOOGLEMAPSKEY,
  domain: process.env.DOMAIN,
};

module.exports = { config };
