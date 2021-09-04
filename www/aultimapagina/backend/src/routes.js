const express = require('express');

const UsersController = require('./controllers/UsersController');

const routes = express.Router();

routes.get('/users', UsersController.index);
routes.post('/users', UsersController.create);
routes.delete('/users/:id', UsersController.delete);

module.exports = routes;