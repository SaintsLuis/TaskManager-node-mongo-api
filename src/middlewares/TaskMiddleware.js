const Task = require('../models/TaskModel')

exports.findTask = async (req, res, next) => {
  let task
  const { id } = req.params

  // expresion regular para validar que el id sea un ObjectId de MongoDB
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: 'Invalid task id' })
  }

  try {
    task = await Task.findById(id)

    if (task == null) {
      return res.status(404).json({ message: 'Cannot find task' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.task = task
  next()
}
