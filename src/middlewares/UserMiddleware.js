const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

exports.findUser = async (req, res, next) => {
  let user
  const { id } = req.params

  // expresion regular para validar que el id sea un ObjectId de MongoDB
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: 'Invalid task id' })
  }

  try {
    user = await User.findById(id)

    if (user == null) {
      return res.status(404).json({ message: 'Cannot find User' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.user = user
  next()
}

// Middleware para autenticar un usuario con un token
exports.authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' })
  }

  const token = authHeader.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(payload._id)
    next()
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' })
  }
}
