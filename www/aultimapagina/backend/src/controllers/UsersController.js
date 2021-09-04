const crypto = require('crypto');
const connection = require('../database/connection');
const usersDao = require('../dao/UsersDao')


module.exports = {

  async index(request, response) {
    const users = await usersDao.get();
    response.json(users);
  },

  async get(request, response) {
    const { id } = request.params;
    const user = await usersDao.get(id);
    response.json(user);
  },

  async create(request, response) {

    let { email, name, cellphone, password } = request.body;
    const id = crypto.randomBytes(4).toString('HEX');
    const role = "user"
    password = md5(password)

    await connection('users').insert({
      id,
      name,
      email,
      cellphone,
      password,
      role
    });

    response.json({ id });
  },

  async delete(request, response) {

    const { id } = request.params;
    let { email, password } = request.body;

    const data = await connection('users')
      .where('id', id)
      .andWhere('email', email)
      .andWhere('password', md5(password))
      .select('id').first();

    if (data && data.id === id) {
      await connection('users').where('id', id).delete();
    }
    else {
      return response.status(401).json({ error: "Operation not permitted" }).send();
    }

    return response.status(204).send();
  }

}
