const taskMiddleware = require('../middlewares/TaskMiddleware')
const Task = require('../models/TaskModel')

// Obtener todas las tareas [GET]
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id })
    res.json(tasks)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Crear una tarea [POST]
exports.createTask = async (req, res) => {}
