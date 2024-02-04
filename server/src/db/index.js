const mysql = require('mysql2/promise')
const { Sequelize } = require('sequelize')
const applyAssociations = require('./associations')

const db = {}

async function checkDBExists() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  })

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_DATABASE}\`;`)
  await connection.end()
}

async function checkDBConnection() {
  console.log(`Checking DB connection...`)
  try {
    await db.sequelize.authenticate()
    console.log('Connected to DB')
  } catch (error) {
    console.error(`Unable to connect to the DB: ${error}`)
    process.exit(1)
  }
}

async function initDB() {
  await checkDBExists()

  const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql'
    }
  )

  db.sequelize = sequelize

  db.User = require('../models/User.model')(sequelize)
  db.Product = require('../models/Product.model')(sequelize)
  db.CartSession = require('../models/CartSession.model')(sequelize)
  db.CartItem = require('../models/CartItem.model')(sequelize)

  applyAssociations(db)

  await db.sequelize.sync()

  await checkDBConnection()
}

db.init = initDB

module.exports = db
