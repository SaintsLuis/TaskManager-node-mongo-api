// app.js
const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/UserRoutes')
const taskRoutes = require('./routes/TaskRoutes')
const connectDB = require('./config/database')
const dotenv = require('dotenv')
dotenv.config()

// Inicializar la app de express
const app = express()
app.use(bodyParser.json()) //

// Conectar a la base de datos
connectDB()

// Rutas
app.use('/users', userRoutes)
app.use('/tasks', taskRoutes)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`)
})
