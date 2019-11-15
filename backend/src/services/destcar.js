const MongoLib = require('../lib/mongo');

class DestcarService {
    constructor() {

        this.mongoDB = new MongoLib();
    }
    async getQuotes({ country }) {
        this.collection = 'quotes';
        const query = country && { country };
        const quotes = await this.mongoDB.getAll(this.collection, query);
        return quotes || {};
    }
    
}
module.exports = DestcarService;