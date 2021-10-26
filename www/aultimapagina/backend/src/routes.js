const express = require('express');

const UsersController = require('./controllers/UsersController');
const PostsController = require('./controllers/PostsController');

const routes = express.Router();

routes.post('/session', UsersController.session);

routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.get);
routes.post('/users', UsersController.create);
routes.delete('/users/:id', UsersController.delete);

routes.get('/posts/:page', PostsController.index);
routes.get('/posts/:id', PostsController.get);
routes.post('/posts', PostsController.create);
routes.delete('/posts/:id', PostsController.delete);

module.exports = routes;