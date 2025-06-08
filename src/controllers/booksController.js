// src/controllers/booksController.js
import fs from 'fs';
import path from 'path';

const booksFile = path.resolve('src/data/books.json');

function readBooks() {
  const data = fs.readFileSync(booksFile);
  return JSON.parse(data);
}

function writeBooks(data) {
  fs.writeFileSync(booksFile, JSON.stringify(data, null, 2));
}

export function getAllBooks(req, res) {
  const books = readBooks();
  res.json(books);
}

export function getBookById(req, res) {
  const books = readBooks();
  const book = books.find(b => b.id === req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
}

export function addBook(req, res) {
  const books = readBooks();
  const newBook = req.body;
  books.push(newBook);
  writeBooks(books);
  res.status(201).json(newBook);
}

export function updateBook(req, res) {
  const books = readBooks();
  const index = books.findIndex(b => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Book not found' });

  books[index] = { ...books[index], ...req.body };
  writeBooks(books);
  res.json(books[index]);
}

export function deleteBook(req, res) {
  let books = readBooks();
  const index = books.findIndex(b => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Book not found' });

  const deleted = books.splice(index, 1);
  writeBooks(books);
  res.json(deleted[0]);
}
