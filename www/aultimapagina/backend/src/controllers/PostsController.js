const connection = require('../database/connection');
const postsDao = require('../dao/PostsDao')
const md5 = require('md5');
const { Post } = require("../models/Post");

const buildPost = (data) => {
  return new Post(data.id,
    data.title,
    data.writer,
    data.text,
    // data.images,
    // data.keywords
  );
};

module.exports = {

  async index(request, response) {
    const { page = 1 } = request.params;
    let posts = await postsDao.index(page);
    console.log(posts)
    response.json(posts);
  },

  async get(request, response) {
    const { id } = request.params;
    const post = await postsDao.get(id);
    response.json(post);
  },

  async create(request, response) {
    const post = buildPost(request.body);
    const id = await postsDao.create(post);
    response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.params;

    let status = postsDao.delete(id);

    if (status === "400") {
      return response.status(401).json({ error: "Operation not permitted" }).send();
    }
    return response.status(204).send();
  },

}
