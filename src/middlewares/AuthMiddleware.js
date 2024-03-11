const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')
const dotenv = require('dotenv')
dotenv.config()

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
