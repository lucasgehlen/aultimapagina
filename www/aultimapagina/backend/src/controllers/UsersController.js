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

  async session(request, response) {
    const { email, password } = request.body;
    const user = await usersDao.getSession(email, password);
    if (!user) {
      return response.status(400).json({ error: 'Erro para logar, usuário e senha inválidos' });
    }
    return response.json(user);
  },

  async create(request, response) {
    const user = buildUser(request.body);
    try {
      const id = await usersDao.create(user);
      return response.json({ id });
    }
    catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return response.status(409).json({ error: 'Erro para cadastrar, email já cadastrado' });
      } else {
        return response.status(400).json({ error: 'Erro para cadastrar' });
      }
    }
  },

  async delete(request, response) {
    const { id } = request.params;
    let { email, password } = request.body;
    const user = await usersDao.getByCredentials(id, email, password);
    if (user && user.id !== id) {
      return response.status(401).json({error: "Operation not permitted"}).send();
    }
    await usersDao.delete(id, email, password);
    return response.status(204).send();
  },
  

}
