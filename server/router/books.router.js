// BOOKS ROUTER

const express = require('express');

const booksRouter = express();

const booksController = require('../controller/books.controller');

booksRouter.get('', booksController.getAll);
booksRouter.get('/:isbn', booksController.getOne);
booksRouter.delete('/:isbn', booksController.delete);
booksRouter.put('/:isbn', booksController.update);
booksRouter.post('', booksController.create);

module.exports = booksRouter;
