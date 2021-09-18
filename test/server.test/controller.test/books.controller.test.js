const booksController = require('../../../server/controller/books.controller');
const error = require('../../../server/resources/errors');
const request = require('./data');
jest.mock('../../../server/service/books.service');

class Response {
    constructor (status, json) {
        this.data = { status, json };
    }

    status (status) {
        return new Response(status, this.data.json);
    }

    json (json) {
        return new Response(this.data.status, json);
    }
}

const controllerTest = (message, method, request, expected) => {
    test(message, async () => {
        const received = await method(request, new Response());
        return expect(received).toEqual(expected);
    });
};

const ok = { result: 'mock' };

const notFound = { isbn: '7654321098765' };

// GET ALL method
controllerTest(
    'Books Controller - get all method - 200',
    booksController.getAll,
    { query: request.query.ok },
    new Response(200, ok)
);

controllerTest(
    'Books Controller - get all method - 400 - incorrect authorId',
    booksController.getAll,
    { query: request.query.incorrect.authorId },
    new Response(400, error.book.authorId.incorrect)
);

controllerTest(
    'Books Controller - get all method - 400 - incorrect categoryId',
    booksController.getAll,
    { query: request.query.incorrect.categoryId },
    new Response(400, error.book.categoryId.incorrect)
);

controllerTest(
    'Books Controller - get all method - 400 - incorrect page',
    booksController.getAll,
    { query: request.query.incorrect.page },
    new Response(400, error.incorrect.page)
);

// GET ONE method
controllerTest(
    'Books Controller - get one method - 200',
    booksController.getOne,
    { params: request.params.ok },
    new Response(200, ok)
);

controllerTest(
    'Books Controller - get one method - 400 - incorrect isbn',
    booksController.getOne,
    { params: request.params.incorrect.isbn },
    new Response(400, error.book.isbn.incorrect)
);

controllerTest(
    'Books Controller - get one method - 404',
    booksController.getOne,
    { params: notFound },
    new Response(404)
);

// CREATE method
controllerTest(
    'Books Controller - create method - 201',
    booksController.create,
    { body: request.body.ok },
    new Response(201, ok)
);

controllerTest(
    'Books Controller - create method - 400 - missing isbn',
    booksController.create,
    { body: request.body.missing.isbn },
    new Response(400, error.book.isbn.missing)
);

controllerTest(
    'Books Controller - create method - 400 - incorrect isbn',
    booksController.create,
    { body: request.body.incorrect.isbn },
    new Response(400, error.book.isbn.incorrect)
);

// UPDATE method
controllerTest(
    'Books Controller - update method - 200',
    booksController.update,
    { params: request.params.ok, body: request.body.ok },
    new Response(200, { result: 1 })
);

controllerTest(
    'Books Controller - update method - 400 - incorrect isbn',
    booksController.update,
    { params: request.params.incorrect.isbn, body: request.body.ok },
    new Response(400, error.book.isbn.incorrect)
);

controllerTest(
    'Books Controller - update method - 400 - missing authorId',
    booksController.update,
    { params: request.params.ok, body: request.body.missing.authorId },
    new Response(400, error.book.authorId.missing)
);

controllerTest(
    'Books Controller - update method - 400 - incorrect authorId',
    booksController.update,
    { params: request.params.ok, body: request.body.incorrect.authorId },
    new Response(400, error.book.authorId.incorrect)
);

controllerTest(
    'Books Controller - update method - 404',
    booksController.update,
    { params: notFound, body: request.body.ok },
    new Response(404)
);

// DELETE method
controllerTest(
    'Books Controller - delete method - 204',
    booksController.delete,
    { params: request.params.ok },
    new Response(204)
);

controllerTest(
    'Books Controller - delete method - 400 - incorrect isbn',
    booksController.delete,
    { params: request.params.incorrect.isbn },
    new Response(400, error.book.isbn.incorrect)
);

controllerTest(
    'Books Controller - delete method - 404',
    booksController.delete,
    { params: notFound },
    new Response(404)
);
