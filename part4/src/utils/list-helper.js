const totalLikes = (blogs) => {
  return blogs.reduce((acc, blog) => (acc += blog.likes), 0);
};

const favoriteBlog = (blogs) => {
  return blogs.sort((a, b) => a.likes - b.likes).pop();
};

module.exports = {
  totalLikes,
  favoriteBlog,
};
