const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({});
  return response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { password, ...data } = request.body;
  const newUser = new User({
    ...data,
    passwordHash: await bcrypt.hash(password, 10),
  });

  const savedBlog = await newUser.save();
  return response.status(201).json(savedBlog);
});

module.exports = usersRouter;
