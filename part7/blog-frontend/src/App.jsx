import { useEffect } from "react";
import { Blog } from "./components/Blog";
import { LoginForm } from "./components/LoginForm";
import Togglable from "./components/Togglable";
import { BlogForm } from "./components/BlogForm";
import { Notification } from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogsReducer";
import { logoutUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const logout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  return (
    <div>
      <Notification />
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
            <Blog key={blog.id} post={blog} user={user} />
          ))}
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default App;
