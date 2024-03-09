const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const bookRoutes = require('./routes/book.routes')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
app.use(bodyParser.json()) // Parse JSON from the request body

// Conectar a la base de datos
mongoose.connect(process.env.MONGO_URI, {
  dbName: process.env.MONGO_DB_NAME,
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
})
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('Connected to MongoDB!')
})

// Rutas
app.use('/books', bookRoutes)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
