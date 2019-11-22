const MongoLib = require('../lib/mongo');
const bcrypt = require('bcrypt');

class UsersService {
  constructor() {
    this.collection = 'users';
    this.mongoDB = new MongoLib();
  }
  async getUser({ userId }) {
    const user = await this.mongoDB.get(this.collection, userId);
    return user;
  }
  async getUserEmail({ email }){
    const[user] = await this.mongoDB.getAll(this.collection, { email });
    return user;
}
  async createUser({ user }) {
    const { name, email, password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUserId = await this.mongoDB.create(this.collection, {
      name,
      email,
      password: hashedPassword
    });
    return createUserId;
  }
  async getUsers({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const users = await this.mongoDB.getAll(this.collection, query);
    return users || [];
  }
  async deleteUser({ userId }){
    const deletedUserId = await this.mongoDB.delete(this.collection, userId);
    return deletedUserId;
  }
  async updateUser({ userId, user }) {
    const updatedUserId = await this.mongoDB.update(this.collection, userId, user);
    return updatedUserId;
  }
  async getOrCreateUser({ user }){
    const queriedUser = await this.getUserEmail({ email: user.email });
    if(queriedUser){
        return queriedUser;
    }
    
    await this.createUser({ user });
    return await this.getUserEmail({ email: user.email });
    
  }
}
module.exports = UsersService;
