const express = require('express');
const mongoose = require('mongoose');
const bookRouter = require('./routes/books');

const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost/books', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });

app.use('/books', bookRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
