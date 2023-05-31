const express = require('express');
const router = express.Router();
const Book = require('../models/book');


router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/', async (req, res) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        publishedYear: req.body.publishedYear
    });

    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            book.title = req.body.title;
            book.author = req.body.author;
            book.description = req.body.description;
            book.publishedYear = req.body.publishedYear;

            const updatedBook = await book.save();
            res.json(updatedBook);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            await book.remove();
            res.json({ message: 'Book deleted' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
