const MongoLib = require('../lib/mongo');
const mapsAPI = require('../lib/maps');


class TripService {
  constructor() {
    this.collection = 'trips';
    this.mongoDB = new MongoLib();
  }
  async getTrip(route) {
    const maps = new mapsAPI();
    const data = maps.getAmount({route});
    return data || {};
  }
  async createTrip({ route }) {
    return route || {};
  }
}
module.exports = TripService;
