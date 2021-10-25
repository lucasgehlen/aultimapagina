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
        .select('*')
        .first();
    // return users.length > 0 ? users[0] : null;
  },

  async getByCredentials(id, email, password) {
    return connection('users')
        .where('id', id)
        .andWhere('email', email)
        .andWhere('password', md5(password))
        .select('id').first();
    // return users.length > 0 ? users[0] : null;
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
    let status;

    connection('users')
      .where('id', id)
      .andWhere('email', email)
      .andWhere('password', md5(password))
      .delete()
      .then(status = 204)
      .catch(status = 400);

    return status;
  },

  /*async createOrUpdate(user) {
    const [success] = await connection('users')
      .insert(user)
      .onDuplicateUpdate('email', 'name', 'cellphone', 'password');

    return success;
  }*/
  

  /*async get(id) {
    const users = await connection('users')
      .where('id', id)
      .select('*');

    return users.length > 0 ? users[0] : null;
  },

  async get(id, email, password) {
    const users = await connection('users')
    .where('id', id)
    .andWhere('email', email)
    .andWhere('password', md5(password))
    .select('*');

    return users && users.length > 0 ? users[0] : null;
  },

   */

  //   async saveOrUpdate(user) {
  //     const [success] = await connection('users')
  //       .insert(user)
  //       .onDuplicateUpdate('login', 'avatar_url', 'url');

  //     return success;
  //   }

}