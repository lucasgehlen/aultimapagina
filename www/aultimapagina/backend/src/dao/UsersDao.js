const connection = require('../database/connection.js');
const md5 = require('md5');

module.exports = {

  async get() {
    const users = await connection('users')
      .select('*');

    return users.length > 0 ? users[0] : null;
  },

  async get(id) {
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

  async delete(id) {
    const users = await connection('users')
      .where('id', id)
      .delete();
  },

  //   async saveOrUpdate(user) {
  //     const [success] = await connection('users')
  //       .insert(user)
  //       .onDuplicateUpdate('login', 'avatar_url', 'url');

  //     return success;
  //   }

}