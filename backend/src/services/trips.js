const MongoLib = require('../lib/mongo');
const mapsAPI = require('../lib/maps');


class TripService {
  constructor() {
    this.collection = 'trips';
    this.mongoDB = new MongoLib();
  }
  async getTrip({ route }) {
    route = 'Se obtuvo una ruta';
    return route || {};
  }
  async createTrip({ route }) {
    return route || {};
  }
}
module.exports = TripService;
