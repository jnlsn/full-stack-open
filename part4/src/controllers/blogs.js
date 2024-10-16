const blogsRouter = require("express").Router();
const Blog = require("../models/blogs");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  return response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const newBlog = new Blog(request.body);

  const savedBlog = await newBlog.save();
  return response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  return res.status(204).end();
});

blogsRouter.patch("/:id", async (req, res) => {
  console.log("params", req.params.id);
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  );
  return res.json(blog);
});

module.exports = blogsRouter;
