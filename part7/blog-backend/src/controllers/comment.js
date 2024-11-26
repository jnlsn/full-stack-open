const router = require("express").Router();
const Comment = require("../models/comment");
const Blog = require("../models/blog");

router.post("/", async (req, res) => {
  const { blog: blogId, ...body } = req.body;
  const comment = new Comment(body);
  const blog = await Blog.findById(blogId);
  blog.comments = (blog.comments ?? []).concat(comment._id);
  await blog.save();
  res.status(201).json(await comment.save());
});

module.exports = router;
