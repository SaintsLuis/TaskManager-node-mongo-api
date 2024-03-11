const express = require('express')
const TaskController = require('../controllers/TaskControllers')
const AuthMiddleware = require('../middlewares/AuthMiddleware')
const TaskMiddleware = require('../middlewares/TaskMiddleware')
const {
  validateCreateTask,
  validateUpdateTask,
  validateTaskId,
} = require('../utils/validations')
const router = express.Router()

// Obtener todas las tareas [GET]
router.get('/', AuthMiddleware.authenticate, TaskController.getAllTasks)

// Crear una nueva tarea [POST]
router.post(
  '/',
  validateCreateTask,
  AuthMiddleware.authenticate,
  TaskController.createTask
)

// Obtener una tarea por su id [GET]
router.get(
  '/:id',
  AuthMiddleware.authenticate,
  TaskMiddleware.findTask,
  TaskController.getTask
)

// Actualizar una tarea [PUT]
router.put(
  '/:id',
  validateUpdateTask,
  AuthMiddleware.authenticate,
  TaskMiddleware.findTask,
  TaskController.updateTask
)

// Eliminar una tarea [DELETE]
router.delete(
  '/:id',
  validateTaskId,
  AuthMiddleware.authenticate,
  TaskMiddleware.findTask,
  TaskController.deleteTask
)

module.exports = router
