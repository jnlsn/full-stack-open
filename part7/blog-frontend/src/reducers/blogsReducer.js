import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    createBlog(state, action) {
      state.push(action.payload);
      return state;
    },
    updateBlog(state, action) {
      const blog = action.payload;
      return state.map((item) => (item.id === blog.id ? blog : item));
    },
    removeBlog(state, action) {
      const id = action.payload;
      return state.filter((item) => item.id !== id);
    },
    addComment(state, action) {
      const comment = action.payload;
      return state.map((item) =>
        item.id === comment.blog
          ? { ...item, comments: [...item.comments, comment] }
          : item
      );
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(blogSlice.actions.setBlogs(blogs));
  };
};

export const createBlog = (content, token) => {
  return async (dispatch) => {
    const blog = await blogService.create(content, token);
    dispatch(blogSlice.actions.createBlog(blog));
  };
};

export const updateBlog = (content, token) => {
  return async (dispatch) => {
    const blog = await blogService.update(content, token);
    dispatch(blogSlice.actions.updateBlog(blog));
  };
};

export const removeBlog = (id, token) => {
  return async (dispatch) => {
    await blogService.remove(id, token);
    dispatch(blogSlice.actions.removeBlog(id));
  };
};

export const addComment = (content) => {
  return async (dispatch) => {
    const result = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    });
    const comment = result.json();
    dispatch(blogSlice.actions.addComment({ ...content, ...comment }));
  };
};

export default blogSlice.reducer;
