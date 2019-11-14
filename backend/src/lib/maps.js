const { config } = require('../config');

const APIKey= config.googleAPIKey;

const MapsURI= `https://maps.googleapis.com/maps/api/directions/json?`;
const origin = `origin=Disneyland`;
const destination = `&destination=Universal+Studios+Hollywood`;
const key = `&key=${APIKey}`;