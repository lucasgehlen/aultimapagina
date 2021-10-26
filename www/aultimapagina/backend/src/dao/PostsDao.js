const crypto = require('crypto');
const connection = require('../database/connection.js');
const { format } = require('date-fns')

module.exports = {

  async index(page) {
    return connection('posts')
        .orderBy('created_at', 'desc')
        .limit(10)
        .offset((page - 1) * 10)
        .select('*');
  },

  async get(id) {
    return connection('posts')
        .where('id', id)
        .select('*')
        .first();
  },

  async create(post) {
    const timestamp = format(new Date(), "yyyy-MM-dd h:mm:ss");

    post.id = crypto.randomBytes(4).toString('HEX')
    post.created_at = timestamp;
    post.updated_at = timestamp;

    await connection('posts')
      .insert(post);

    return post.id;
  },

  async delete(id) {
    return connection('posts')
      .where('id', id)
      .delete()
  },

}