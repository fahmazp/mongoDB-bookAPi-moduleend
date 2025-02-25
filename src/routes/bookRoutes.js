const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')
const validateBook = require('../middlewares/validateBooks')

router.post('/', validateBook, bookController.createBook)
router.get('/', bookController.getAllbooks)
router.get('/:id', bookController.getBookById)
router.put('/:id', validateBook, bookController.updateBook)
router.delete('/:id', bookController.deleteById)

module.exports = router