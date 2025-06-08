import request from 'supertest';
import express from 'express';
import booksRouter from '../routes/books.js';

const app = express();
app.use(express.json());
app.use('/books', booksRouter);

describe('GET /books', () => {
  it('should return a list of books', async () => {
    const res = await request(app).get('/books');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
