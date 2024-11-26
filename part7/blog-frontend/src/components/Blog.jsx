import { useEffect, useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, removeBlog, updateBlog } from "../reducers/blogsReducer";
import { useNavigate, useParams } from "react-router";

export const Blog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const blog = useSelector((state) =>
    state.blogs.find((item) => item.id === id)
  );

  const handleLike = async () => {
    dispatch(updateBlog({ ...blog, likes: (blog.likes || 0) + 1 }));
  };

  const handleRemove = async () => {
    const doIt = await confirm(`Delete the post: ${blog.title}`);
    if (doIt) {
      dispatch(removeBlog(blog.id, user.token)).then(() => {
        navigate("/");
      });
    }
  };

  if (!blog) return null;
  console.log(blog);

  return (
    <>
      <h2>{blog.title}</h2>
      <ul>
        {blog.url && <li>{blog.url}</li>}
        <li>
          Likes: {blog.likes} <button onClick={handleLike}>Like</button>
        </li>
        {blog.author && <li>{blog.author}</li>}
      </ul>
      <p>Added by: {blog.user.name}</p>
      {user.username === blog?.user?.username && (
        <button onClick={handleRemove}>remove</button>
      )}
      <h3>Comments</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const data = new FormData(form);
          dispatch(
            addComment({ blog: blog.id, comment: data.get("comment") })
          ).then(() => {
            form.reset();
          });
        }}
      >
        <input type="text" name="comment" />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.comment}</li>
        ))}
      </ul>
    </>
  );
};
