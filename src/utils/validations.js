const { body, param } = require('express-validator')

// Users
exports.validateCreateUser = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
]

exports.validateLoginUser = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').notEmpty().withMessage('Password is required'),
]

exports.validateUpdateUser = [
  param('id').isMongoId().withMessage('Invalid user ID'),
  body('name').optional().notEmpty().withMessage('Name is required'),
  body('email').optional().isEmail().withMessage('Invalid email address'),
  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
]

// Tasks
exports.validateCreateTask = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),
  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 10, max: 255 })
    .withMessage('Description must be between 10 and 255 characters'),
  body('completed')
    .optional()
    .isBoolean()
    .withMessage('Invalid completed value'),
]

exports.validateUpdateTask = [
  param('id').isMongoId().withMessage('Invalid task ID'),
  body('title').optional().notEmpty().withMessage('Title is required'),
  body('description')
    .optional()
    .notEmpty()
    .withMessage('Description is required'),
]

exports.validateTaskId = [
  param('id').isMongoId().withMessage('Invalid task ID'),
]

exports.validateUserId = [
  param('id').isMongoId().withMessage('Invalid user ID'),
]
