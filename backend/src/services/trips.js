const MongoLib = require('../lib/mongo');


class TripService {
    constructor() {
        this.collection = 'trips';
        this.mongoDB = new MongoLib();
    }
    async getTrip({ route }) {
        return route || {};
    }
    async createTrip({ route }) {
        return route || {};
    }

}
module.exports = TripService;