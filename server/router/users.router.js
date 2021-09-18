// USERS ROUTER

const express = require('express');

const usersRouter = express();

const usersController = require('../controller/users.controller');

usersRouter.get('', usersController.getAll);
usersRouter.get('/:id', usersController.getOne);
usersRouter.delete('/:id', usersController.delete);
usersRouter.put('/:id', usersController.update);
usersRouter.post('', usersController.create);

module.exports = usersRouter;
