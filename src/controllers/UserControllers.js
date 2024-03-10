const User = require('../models/UserModel')
const UserMiddleware = require('../middlewares/UserMiddleware')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

// Iniciar sesión [POST]
exports.loginUser = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) {
    return res.status(404).json({ message: 'Invalid email or password' })
  }

  const isMatch = await user.isValidPassword(password)
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid email or password' })
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
  res.json({ token })
}

// Obtener todos los usuarios [GET]
exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Obtener un usuario por su id [GET]
exports.getUserById = async (req, res) => {
  res.json(res.user)
}

// Crear un usuario [POST]
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    // Verificar si el correo electrónico ya está en uso
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' })
    }

    // Crear un nuevo usuario
    const user = new User({
      name,
      email,
      password,
    })

    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Actualizar parcial un usuario [PATCH]
exports.updateUserPartial = async (req, res) => {
  // Extraer el ID del usuario del token
  const userIdFromToken = req.user._id

  // Extraer el ID del usuario que se está actualizando de la ruta
  const userIdFromRoute = req.params.id

  // Verificar si el usuario que hace la petición es el mismo que se quiere actualizar
  if (userIdFromToken.toString() !== userIdFromRoute) {
    return res.status(403).json({ message: 'Forbidden' })
  }

  try {
    const updatedUser = await res.user.set(req.body).save()
    res.json(updatedUser)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Actualizar un usuario COMPLETO [PUT]
exports.updateUserComplete = async (req, res) => {
  // Extraer el ID del usuario del token
  const userIdFromToken = req.user._id

  // Extraer el ID del usuario que se está actualizando de la ruta
  const userIdFromRoute = req.params.id

  // Verificar si el usuario que hace la petición es el mismo que se quiere actualizar
  if (userIdFromToken.toString() !== userIdFromRoute) {
    return res.status(403).json({ message: 'Forbidden' })
  }

  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  try {
    const updatedUser = await res.user.set(req.body).save()
    res.json(updatedUser)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Eliminar un usuario por su id [DELETE]
exports.deleteUser = async (req, res) => {
  // Extraer el ID del usuario del token
  const userIdFromToken = req.user._id

  // Extraer el ID del usuario que se está actualizando de la ruta
  const userIdFromRoute = req.params.id

  // Verificar si el usuario que hace la petición es el mismo que se quiere actualizar
  if (userIdFromToken.toString() !== userIdFromRoute) {
    return res.status(403).json({ message: 'Forbidden' })
  }

  try {
    const userDeleted = await res.user
    await userDeleted.deleteOne()

    res.json({
      message: `User ${userDeleted.name} deleted successfully!`,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
