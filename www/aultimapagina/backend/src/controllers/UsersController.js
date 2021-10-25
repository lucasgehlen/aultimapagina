const connection = require('../database/connection');
const usersDao = require('../dao/UsersDao')
const md5 = require('md5');
const { User } = require("../models/User");

const buildUser = (data) => {
  return new User(data.id,
    data.name, 
    data.email, 
    data.cellphone, 
    data.password, 
    data.role,
    data.created_at,
    data.updated_at );
};

module.exports = {

  async index(request, response) {
    let users = await usersDao.index();
    response.json(users);
  },

  async get(request, response) {
    const { id } = request.params;
    const user = await usersDao.get(id);
    response.json(user);
  },

  async create(request, response) {
    const user = buildUser(request.body);
    const id = await usersDao.create(user);
    response.json({ id });
  },

  async delete(request, response) {

    const { id } = request.params;
    let { email, password } = request.body;

    const user = await usersDao.getByCredentials(id, email, password);

    if (user && user.id === id) {
      usersDao.delete(id, email, password);
    }
    else {
      return response.status(401).json({ error: "Operation not permitted" }).send();
    }

    return response.status(204).send();
  },
  

}
