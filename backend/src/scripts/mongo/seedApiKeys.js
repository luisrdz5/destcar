
// DEBUG=app:* node scripts/mongo/seedApiKeys.js

const chalk = require('chalk');
const crypto = require('crypto');
const debug = require('debug')('app:scripts:api-keys');
const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../../config');

const USER = encodeURIComponent('db_user_destcar');
const PASSWORD = encodeURIComponent('password123destcar');
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@$cluster0-luiv4.mongodb.net/$destcar_db?retryWrites=true&w=majority`; 

class MongoLib{
    constructor() {
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        this.dbName = DB_NAME;
    }
    connect(){
        if(!MongoLib.connection){
            MongoLib.connection = new Promise((resolve, reject) => {
                this.client.connect(err => {
                    if(err){
                        reject(err);
                    }
                    console.log('Connected succesfully to mongo');
                    console.log(this.client.db(this.dbName));
                    resolve(this.client.db(this.dbName));
                });
            });
        }
        return MongoLib.connection;
    }
    getAll(collection, query){
        return this.connect().then(db => {
            return db.collection(collection).find(query).toArray();
        })
    }
    get(collection, id) {
        return this.connect().then(db => {
            return db.collection(collection).findOne({ _id: ObjectId(id)});
        })

    }
    create(collection, data) {
        return this.connect().then(db => {
            return db.collection(collection).insertOne(data);
        }).then(result => result.insertedId);

    }
    update(collection, id, data) {
        return this.connect()
            .then(db => {
                return db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true});
            })
            .then(result => result.upsertedId || id);
    }
    delete(collection, id) {
        return this.connect().then(db => {
            return db.collection(collection).deleteOne({ _id: ObjectId(id)});
        }).then(() => id)
    }
}

const adminScopes = [
  'signin:auth',
  'signup:auth',
  'read:payments',
  'create:payments',
  'update:payments',
  'delete:payments',
  'read:quotes',
  'create:quotes',
  'delete:quotes',
  'update:quotes',
  'read:trips',
  'create:trips'
]

const publicScopes = [
  'signin:auth',
  'signup:auth',
  'read:payments',
  'create:payments',
  'update:payments',
  'delete:payments',
  'read:quotes',
  'read:trips',
  'create:trips'
]

const apiKeys = [
  {
    token: generateRandomToken(),
    scopes: adminScopes
  },
  {
    token: generateRandomToken(),
    scopes: publicScopes
  }
];

function generateRandomToken() {
  const buffer = crypto.randomBytes(32);
  return buffer.toString('hex');
}

async function seedApiKeys() {
  try {
    const mongoDB = new MongoLib();
    const promises = apiKeys.map(async apiKey => {
      console.log(apiKey);
      await mongoDB.create('api-keys', apiKey);
    });

    await Promise.all(promises);
    debug(chalk.green(`${promises.length} api keys have been created succesfully`)); // prettier-ignore
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

seedApiKeys();