// set DEBUG=app:* && node scripts/mongo/seedUsers.js

const bcrypt = require('bcryptjs')
const chalk = require('chalk')
const debug = require('debug')
const MongoLib = require('../../lib/mongo')
const { config } = require('../../config')

const users = [
  {
    email: 'root@undefined.sh',
    name: 'ROOT',
    password: 'root',
    isAdmin: true
  },
  {
    email: 'jose@undefined.sh',
    name: 'Jose Maria',
    password: 'secret'
  },
  {
    email: 'maria@undefined.sh',
    name: 'Maria Jose',
    password: 'secret'
  },
]

async function createUser(mongoDB, user) {
  const { name, email, password, isAdmin } = user
  const hashedPassword = await bcrypt.hash(password, 10)

  const userId = await mongoDB.create('users', {
    name,
    email,
    password: hashedPassword,
    isAdmin: Boolean(isAdmin)
  })

  return userId
}

async function seedUsers() {
  try {
    const mongoDB = new MongoLib()
    
    const promises = users.map(async user => {
      const userId = await createUser(mongoDB, user)
      debug(chalk.green('User created with id:', userId))
    })

    await Promise.all(promises)
    return process.exit(0)
  } catch(error) {
    debug(chalk.red(error))
    process.exit(1)
  }
}
seedUsers()