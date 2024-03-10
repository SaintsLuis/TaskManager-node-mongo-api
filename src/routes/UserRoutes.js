const express = require('express')
const UserController = require('../controllers/UserControllers')
const UserMiddleware = require('../middlewares/UserMiddleware')
const router = express.Router()

// Obtener todos los usuarios [GET]
router.get('/', UserController.getAllUser)

// Crear un usuario [POST]
router.post('/', UserController.createUser)

// Iniciar sesión [POST]
router.post('/login', UserController.loginUser)

// Obtener un usuario por su id [GET]
router.get(
  '/:id',
  UserMiddleware.authenticate,
  UserMiddleware.findUser,
  UserController.getUserById
)

// Actualizar parcial un usuario [PATCH]
router.patch(
  '/:id',
  UserMiddleware.authenticate,
  UserMiddleware.findUser,
  UserController.updateUserPartial
)

// Actualizar completo un usuario [PUT]
router.put(
  '/:id',
  UserMiddleware.authenticate,
  UserMiddleware.findUser,
  UserController.updateUserComplete
)

// Eliminar un usuario [DELETE]
router.delete(
  '/:id',
  UserMiddleware.authenticate,
  UserMiddleware.findUser,
  UserController.deleteUser
)

module.exports = router
