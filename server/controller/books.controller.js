// BOOKS CONTROLLER

const fs = require('fs');
const path = require('path');
const { Buffer } = require('buffer');

const booksService = require('../service/books.service');
const error = require('../resources/errors');
const logger = require('../winston/logger');

function callback () {
    return (err) => {
        if (err) {
            console.log(err);
        }
    };
}

function coverPath (isbn) { return path.join(__dirname, `../public/${isbn}.jpg`); }

function coverBuffer (cover) { return Buffer.from(cover.replace(/^.{23}/, ''), 'base64'); }

function uuidValid (uuid) { return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid); }

function isbnValid (isbn) { return /^[0-9]{10}$/i.test(isbn) || /^[0-9]{13}$/i.test(isbn); }

function positiveIntegerValid (positiveInteger) { return Number.isInteger(Number(positiveInteger)) && positiveInteger > 0; }

function paramsValid (params) {
    const { isbn, authorId, categoryId, title, year, price, count, annotation } = params;

    if (!isbn) {
        return error.book.isbn.missing;
    }

    if (!authorId) {
        return error.book.authorId.missing;
    }

    if (!categoryId) {
        return error.book.categoryId.missing;
    }

    if (!title) {
        return error.book.title.missing;
    }

    if (!year) {
        return error.book.year.missing;
    }

    if (!price) {
        return error.book.price.missing;
    }

    if (!(count || count === 0)) {
        return error.book.count.missing;
    }

    if (!annotation) {
        return error.book.annotation.missing;
    }

    if (!isbnValid(isbn)) {
        return error.book.isbn.incorrect;
    }

    if (!uuidValid(authorId)) {
        return error.book.authorId.incorrect;
    }

    if (!uuidValid(categoryId)) {
        return error.book.categoryId.incorrect;
    }

    return 0;
}

class BooksController {
    async getAll (req, res) {
        const reqId = req.headers && { 'X-Request-ID': req.headers['x-request-id'] };
        const { authorId, categoryId, search, sort, page } = req.query;
        const debug = err => logger.debug('Bad Request', { ...reqId, ...err });

        logger.info('Books Controller - Get All', {
            ...reqId, params: { authorId, categoryId, search, sort, page }
        });

        if (authorId && !uuidValid(authorId)) {
            const err = error.book.authorId.incorrect;
            debug(err);
            return res.status(400).json(err);
        }
        if (categoryId && !uuidValid(categoryId)) {
            const err = error.book.categoryId.incorrect;
            debug(err);
            return res.status(400).json(err);
        }
        if (page && !positiveIntegerValid(page)) {
            const err = error.incorrect.page;
            debug(err);
            return res.status(400).json(err);
        }
        try {
            const result = await booksService.getAll(authorId, categoryId, search, sort, page);
            logger.debug('OK', reqId);
            return res.status(200).json({ result });
        } catch (err) {
            logger.error('Internal Server Error', { ...reqId, ERROR: err });
            return res.status(500).json();
        }
    }

    async getOne (req, res) {
        const isbn = req.params.isbn;
        if (!isbnValid(isbn)) {
            return res.status(400).json(error.book.isbn.incorrect);
        }

        try {
            const result = await booksService.getOne(isbn);
            if (result === null) {
                return res.status(404).json();
            }
            result.setDataValue && result.setDataValue('coverExists', fs.existsSync(coverPath(isbn)));
            return res.status(200).json({ result });
        } catch (err) {
            return res.status(500).json();
        }
    }

    async delete (req, res) {
        const isbn = req.params.isbn;
        if (!isbnValid(isbn)) {
            return res.status(400).json(error.book.isbn.incorrect);
        }

        fs.unlink(coverPath(isbn), callback());

        try {
            const result = await booksService.delete(isbn);
            if (result) {
                return res.status(204).json();
            }
            return res.status(404).json();
        } catch (err) {
            return res.status(500).json();
        }
    }

    async update (req, res) {
        const currentIsbn = req.params.isbn;
        if (!isbnValid(currentIsbn)) {
            return res.status(400).json(error.book.isbn.incorrect);
        }

        const params = req.body;
        const err = paramsValid(params);
        if (err) {
            return res.status(400).json(err);
        }
        const { isbn, authorId, categoryId, title, year, price, count, annotation, cover, coverDeleted } = params;

        if (coverDeleted) {
            fs.unlink(coverPath(currentIsbn), callback());
        }

        if (isbn !== currentIsbn) {
            fs.rename(coverPath(currentIsbn), coverPath(isbn), callback());
        }

        if (cover?.length) {
            fs.writeFile(coverPath(isbn), coverBuffer(cover), callback());
        }

        try {
            const result = await booksService.update(
                currentIsbn,
                isbn, authorId, categoryId, title,
                year, price, count, annotation
            );
            if (result) {
                return res.status(200).json({ result });
            }
            return res.status(404).json();
        } catch (err) {
            return res.status(500).json();
        }
    }

    async create (req, res) {
        const params = req.body;
        const err = paramsValid(params);
        if (err) {
            return res.status(400).json(err);
        }
        const { isbn, authorId, categoryId, title, year, price, count, annotation, cover } = params;

        if (cover?.length) {
            fs.writeFile(coverPath(isbn), coverBuffer(cover), callback());
        }

        try {
            const result = await booksService.create(
                isbn, authorId, categoryId, title,
                year, price, count, annotation
            );
            if (result) {
                return res.status(201).json({ result });
            }
            return res.status(404).json();
        } catch (err) {
            return res.status(500).json();
        }
    }
}

const booksController = new BooksController();

module.exports = booksController;
