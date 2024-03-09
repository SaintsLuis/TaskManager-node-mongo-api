const express = require('express')
const router = express.Router()
const Book = require('../models/book.model')

// Middlewares
const getBook = async (req, res, next) => {
  let book
  const { id } = req.params

  // expresion regular para validar que el id sea un ObjectId de MongoDB
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: 'Invalid book id' })
  }

  try {
    book = await Book.findById(id)
    if (book === null) {
      return res.status(404).json({ message: 'Book not found' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

  res.book = book
  next()
}

// Obtener todos los libros [GET]
router.get('/', async (req, res) => {
  try {
    const books = await Book.find()
    console.log('GET ALL', books)

    if (books.length === 0) {
      return res.status(204).json({ message: 'No books found' })
    }

    res.json(books)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Obtener un libro por su id [GET] y el middleware getBook
router.get('/:id', getBook, (req, res) => {
  res.json(res.book)
})

// Crear un nuevo libro (recurso) [POST]
router.post('/', async (req, res) => {
  const { title, author, genre, description, publication_date } = req?.body

  if (!title || !author || !genre || !description || !publication_date) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  try {
    // si el libro (titulo) ya existe, retornar un error
    const existingBook = await Book.findOne({ title: title })
    if (existingBook) {
      return res.status(409).json({ message: 'Book already exists' })
    }

    const newBook = new Book({
      title,
      author,
      genre,
      description,
      publication_date,
    })
    const savedBook = await newBook.save()
    console.log('POST', savedBook)

    res.status(201).json(savedBook)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Actualización parcial de un libro por su id [PATCH] y el middleware getBook, que valida que el libro exista
router.patch('/:id', getBook, async (req, res) => {
  try {
    // setear solo los valores presentes en el body al libro encontrado y guardar
    const updatedBook = await res.book.set(req.body).save()
    console.log('PATCH', updatedBook)

    res.json(updatedBook)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Actualizar un libro COMPLETO por su id [PUT] y el middleware getBook, que valida que el libro exista
router.put('/:id', getBook, async (req, res) => {
  const { title, author, genre, description, publication_date } = req?.body

  if (!title || !author || !genre || !description || !publication_date) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  try {
    // setear los valores del body al libro encontrado y guardar
    const updatedBook = await res.book.set(req.body).save()
    console.log('PUT', updatedBook)

    res.json(updatedBook)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Eliminar un libro por su id [DELETE] y el middleware getBook, que valida que el libro exista
router.delete('/:id', getBook, async (req, res) => {
  try {
    if (!(res.book instanceof Book)) {
      return res.status(500).json({ message: 'Book not found' })
    }

    const deletedBook = res.book
    await deletedBook.deleteOne({
      _id: deletedBook._id,
    })

    console.log('DELETE', deletedBook)

    res.json({
      message: `The book ${deletedBook.title} has been successfully removed`,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
