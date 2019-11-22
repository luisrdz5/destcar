const MongoLib = require('../lib/mongo');

class ApiKeysService {
    constructor() {
        this.collection = 'api-keys';
        this.mongoDB = new MongoLib();
    }
    async getApiKey({ token }){
        const [ apiKey ] = await this.mongoDB.getAll(this.collection, { token });
        return apiKey;
    }
    async createApiKey({ data }){
        const createKeyId = await this.mongoDB.create(this.collection, { data });
        return createKeyId;
    }
}
module.exports = ApiKeysService;