const crypto = require('crypto');
const connection = require('../database/connection.js');
const md5 = require('md5');
const { format } = require('date-fns')

module.exports = {

  async index() {
    return connection('users')
        .select('*');
  },

  async get(id) {
    return connection('users')
        .where('id', id)
        .select('id', 'email', 'name', 'role')
        .first();
  },

  async getSession(email, password) {
    return connection('users')
        .where('email', email)
        .andWhere('password', md5(password))
        .select('id', 'email', 'name').first();
  },

  async getByCredentials(id, email, password) {
    return connection('users')
        .where('id', id)
        .andWhere('email', email)
        .andWhere('password', md5(password))
        .select('id').first();
  },
  
  async create(user) {
    const timestamp = format(new Date(), "yyyy-MM-dd h:mm:ss");

    user.id = crypto.randomBytes(4).toString('HEX')
    user.role = "USER";
    user.password = md5(user.password);
    user.created_at = timestamp;
    user.updated_at = timestamp;

    await connection('users')
      .insert(user);

    return user.id;
  },

  async delete(id, email, password) {
    return connection('users')
      .where('id', id)
      .andWhere('email', email)
      .andWhere('password', md5(password))
      .delete()
  },

}