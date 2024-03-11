const { validationResult } = require('express-validator')
const Task = require('../models/TaskModel')

// Obtener todas las tareas [GET]
exports.getAllTasks = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const tasks = await Task.find({ user: req.user._id })
    res.json(tasks)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Obtener una tarea por su id [GET]
exports.getTask = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id })
    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }
    res.json(task)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Crear una nueva tarea [POST]
exports.createTask = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  // Prevent user from setting user manually
  const { user, ...taskData } = req.body
  if (user) {
    return res.status(400).json({ message: 'Cannot set user manually' })
  }

  try {
    const task = new Task({
      ...taskData,
      user: req.user._id,
    })
    await task.save()
    res.status(201).json(task)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// Actualizar una tarea [PUT]
exports.updateTask = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id })
    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    Object.assign(task, req.body)
    const updatedTask = await task.save()
    res.json(updatedTask)
  } catch (error) {
    res.status(400).send(error)
  }
}

// Eliminar una tarea [DELETE]
exports.deleteTask = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    })
    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }
    res.json({ message: 'Task deleted successfully' })
  } catch (error) {
    res.status(500).send(error)
  }
}
