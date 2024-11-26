import { useId, useState } from "react";
import { useDispatch } from "react-redux";
import { removeBlog, updateBlog } from "../reducers/blogsReducer";

export const Blog = ({ post, user }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const id = useId();

  const handleLike = async () => {
    dispatch(updateBlog({ ...post, likes: (post.likes || 0) + 1 }));
  };

  const handleRemove = async () => {
    const doIt = await confirm(`Delete the post: ${post.title}`);
    if (doIt) {
      dispatch(removeBlog(post.id, user.token));
    }
  };

  return (
    <div style={{ padding: ".5rem", border: "1px solid black" }}>
      <span>{post.title}</span>{" "}
      <button aria-controls={id} onClick={() => setVisible(!visible)}>
        {visible ? "hide" : "show"}
      </button>
      <div aria-expanded={visible} id={id} hidden={!visible}>
        <ul>
          {post.url && <li>{post.url}</li>}
          <li>
            Likes: {post.likes} <button onClick={handleLike}>Like</button>
          </li>
          {post.author && <li>{post.author}</li>}
        </ul>
        {user.username === post?.user?.username && (
          <button onClick={handleRemove}>remove</button>
        )}
      </div>
    </div>
  );
};
