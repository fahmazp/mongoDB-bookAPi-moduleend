const mongoose = require('mongoose');

// const books = [];
// let currentId = 1;
// const bookSchema = new mongoose.Schema({ 
//   title: String,
// })
// defining scheme and model
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  pubYear: Number,
  price: Number,
})

const bookModel = mongoose.model('bookData', bookSchema);  

// create new book
exports.createBook = async (req, res) => {
  try {
    const newBook = await bookModel.create(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// get all books (with optional search query)
exports.getAllbooks = async (req, res) => {
  try {
    const { searchbooks } = req.query;
    let books;
    
    if (searchbooks) {
      books = await bookModel.find({
        $or: [
          { title: new RegExp(searchbooks, 'i') },
          { author: new RegExp(searchbooks, 'i') }
        ]
      });
    } else {
      books = await bookModel.find();
    }

    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await bookModel.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a book by ID (full update)
exports.updateBook = async (req, res) => {
  try {
    const book = await bookModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a book by ID
exports.deleteById = async (req, res) => {
  try {
    const book = await bookModel.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
