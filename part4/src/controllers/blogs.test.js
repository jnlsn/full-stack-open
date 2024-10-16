const { test, after, describe, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("../tests/helper");

const api = supertest(app);

describe("blogs controller", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    for (let initialBlog of helper.initialBlogs) {
      let newBlog = new Blog(initialBlog);
      await newBlog.save();
    }
  });

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("blogs have id property", async () => {
    const res = await api.get("/api/blogs");
    assert("id" in res.body[0]);
  });

  test("creates a blog", async () => {
    await api.post("/api/blogs").send({ title: "new one" });
    const res = await api.get("/api/blogs");
    assert(res.body.some((blog) => blog.title === "new one"));
  });

  test("deletes a blog", async () => {
    const res = await api.get("/api/blogs");
    const { id } = res.body[0];
    await api.delete(`/api/blogs/${id}`);
    const res2 = await api.get("/api/blogs");
    assert(res2.body.every((blog) => blog.id !== id));
  });

  test("updates a blog", async () => {
    const res = await api.get("/api/blogs");
    const { id } = res.body[0];
    const res2 = await api
      .patch(`/api/blogs/${id}`)
      .send({ title: "new title" });
    console.log(res2.body);
    assert.strictEqual(res2.body.title, "new title");
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
