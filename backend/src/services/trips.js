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
    //const filledRoute = maps.getRoute(data.data.route)
    console.log(`(trips.js) data es: ${JSON.stringify(data)}`);
    //console.log(`(trips.js) stringRoute es: ${filledRoute}`);
    return data || {};
  }
  async createTrip({ route }) {
    return route || {};
  }
}
module.exports = TripService;
