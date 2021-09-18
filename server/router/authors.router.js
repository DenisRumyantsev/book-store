// AUTHORS ROUTER

const express = require('express');

const authorsRouter = express();

const authorsController = require('../controller/authors.controller');

authorsRouter.get('', authorsController.getAll);
authorsRouter.get('/:id', authorsController.getOne);
authorsRouter.delete('/:id', authorsController.delete);
authorsRouter.put('/:id', authorsController.update);
authorsRouter.post('', authorsController.create);

module.exports = authorsRouter;
