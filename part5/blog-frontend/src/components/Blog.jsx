import { useId, useState } from "react";
import blogService from "../services/blogs";

export const Blog = ({ post, user, onBlogChange }) => {
  const [visible, setVisible] = useState(false);
  const id = useId();

  const handleLike = async () => {
    const updatedBlog = await blogService.update(
      { ...post, likes: post.likes + 1 },
      user.token
    );
    onBlogChange(updatedBlog);
  };

  const handleRemove = async () => {
    const doIt = await confirm(`Delete the post: ${post.title}`);
    if (doIt) {
      await blogService.remove(post.id, user.token);
      onBlogChange(post, true);
    }
  };

  return (
    <div style={{ padding: ".5rem", border: "1px solid black" }}>
      {post.title}{" "}
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
