const MongoLib = require('../lib/mongo');
const bcrypt = require('bcrypt');

class DriversService {
  constructor() {
    this.collection = 'drivers';
    this.mongoDB = new MongoLib();
  }
  async getDriver({ driverId }) {
    const user = await this.mongoDB.get(this.collection, driverId);
    return user || {};
  }
  async createDriver({ driver }) {
    const { firstName, lastName, phone, email, password ,idCar, dateOfBirth } = driver;
    const hashedPassword = await bcrypt.hash(password, 10);

    const createDriverId = await this.mongoDB.create(this.collection, {
      firstName,
      lastName,
      phone,
      email,
      password: hashedPassword,
      idCar,
      dateOfBirth
    });
    return createDriverId;
  }
  async getDrivers({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const drivers = await this.mongoDB.getAll(this.collection, query);
    return drivers || [];
  }
  async deleteDriver({ driverId }){
    const deletedDriverId = await this.mongoDB.delete(this.collection, driverId);
    return deletedDriverId;
  }
  async updateUser({ driverId, driver }) {
    const updatedDriverId = await this.mongoDB.update(this.collection, driverId, driver);
    return updatedDriverId;
  }
}
module.exports = DriversService;
