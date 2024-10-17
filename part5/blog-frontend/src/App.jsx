import { useState, useEffect } from "react";
import { Blog } from "./components/Blog";
import blogService from "./services/blogs";
import { LoginForm } from "./components/LoginForm";
import Togglable from "./components/Togglable";
import { BlogForm } from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  const logout = () => {
    window.localStorage.removeItem("loggedAppUser");
    setUser(null);
  };

  const onBlogChange = (post, remove = false) => {
    const i = blogs.findIndex((blog) => blog.id === post.id);
    setBlogs(remove ? blogs.toSpliced(i, 1) : blogs.toSpliced(i, 1, post));
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  return (
    <div>
      {user ? (
        <>
          <p>
            {user.name} is logged in
            <button onClick={logout}>logout</button>
          </p>
          <Togglable buttonLabel="New Post">
            <BlogForm user={user} />
          </Togglable>
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              post={blog}
              user={user}
              onBlogChange={onBlogChange}
            />
          ))}
        </>
      ) : (
        <LoginForm setUser={setUser} />
      )}
    </div>
  );
};

export default App;
