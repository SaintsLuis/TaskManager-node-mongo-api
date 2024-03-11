const User = require('../models/UserModel')

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
