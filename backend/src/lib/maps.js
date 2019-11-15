const { config } = require('../config');

const APIKey= config.googleAPIKey;

const MapsURI= `https://maps.googleapis.com/maps/api/directions/json?`;
const origin = `origin=Disneyland`;
const destination = `&destination=Universal+Studios+Hollywood`;
const key = `&key=${APIKey}`;
// Disneyland y Universal+Studios+Hollywood
class mapsAPI  {
    constructor() {
        this.MapsURI= `https://maps.googleapis.com/maps/api/directions/json?`;
        this.origin = `origin=`;
        this.destination = `&destination=`;
        this.key = `&key=${APIKey}`;
    }

    
}

module.exports = mapsAPI;