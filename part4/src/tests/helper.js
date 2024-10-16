const Blogs = require("../models/blogs");

const initialBlogs = [
  {
    title: "HTML is easy",
    author: "Harpo",
  },
  {
    title: "Browser can execute only JavaScript",
    author: "Groucho",
  },
];

const nonExistingId = async () => {
  const blog = new Blogs({ title: "willremovethissoon" });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((note) => note.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
