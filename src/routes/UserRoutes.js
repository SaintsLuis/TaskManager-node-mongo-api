const express = require('express')
const AuthMiddleware = require('../middlewares/AuthMiddleware')
const UserMiddleware = require('../middlewares/UserMiddleware')
const UserController = require('../controllers/UserControllers')
const {
  validateCreateUser,
  validateUpdateUser,
  validateLoginUser,
  validateUserId,
} = require('../utils/validations')
const router = express.Router()

// Obtener todos los usuarios [GET]
router.get('/', UserController.getAllUser)

// Crear un usuario [POST]
router.post('/', validateCreateUser, UserController.createUser)

// Iniciar sesión [POST]
router.post('/login', validateLoginUser, UserController.loginUser)

// Obtener un usuario por su id [GET]
router.get(
  '/:id',
  AuthMiddleware.authenticate,
  UserMiddleware.findUser,
  UserController.getUserById
)

// Actualizar parcial un usuario [PATCH]
router.patch(
  '/:id',
  validateUpdateUser,
  AuthMiddleware.authenticate,
  UserMiddleware.findUser,
  UserController.updateUserPartial
)

// Actualizar completo un usuario [PUT]
router.put(
  '/:id',
  validateUpdateUser,
  AuthMiddleware.authenticate,
  UserMiddleware.findUser,
  UserController.updateUserComplete
)

// Eliminar un usuario [DELETE]
router.delete(
  '/:id',
  validateUserId,
  AuthMiddleware.authenticate,
  UserMiddleware.findUser,
  UserController.deleteUser
)

module.exports = router
