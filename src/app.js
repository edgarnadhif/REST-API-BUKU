// src/app.js
import express from 'express';
import booksRouter from './routes/books.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/books', booksRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
