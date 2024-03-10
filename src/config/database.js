// config/database.js | Mongoose connection
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.MONGO_DB_NAME,
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASS,
    })
    console.log('Connected to MongoDB!')
  } catch (err) {
    console.error('Error connecting to MongoDB:', err)
    process.exit(1) // Terminar el proceso en caso de error
  }
}

module.exports = connectDB
