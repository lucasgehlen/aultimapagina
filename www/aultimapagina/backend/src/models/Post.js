class Post {
    constructor(id, title, writer, text) {
        this.id = id;
        this.title = title;
        this.writer = writer;
        this.text = text;
        // this.images = images;
        // this.keywords = keywords;
    }
}
  
module.exports = { Post }