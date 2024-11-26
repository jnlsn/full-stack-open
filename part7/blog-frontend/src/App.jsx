import { useEffect, useState } from "react";
import { Blog } from "./components/Blog";
import { LoginForm } from "./components/LoginForm";
import Togglable from "./components/Togglable";
import { BlogForm } from "./components/BlogForm";
import { Notification } from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogsReducer";
import { logoutUser } from "./reducers/userReducer";
import { Routes, Route, Link, useParams } from "react-router";
import { Navigation } from "./components/Navigation";
import "./main.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);
  return (
    <>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then((res) => res.json())
      .then(setUser);
  }, [id]);
  if (!user) return null;
  return (
    <>
      <h2>{user.name}</h2>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  return (
    <div>
      <Navigation />
      <Notification />
      <Routes>
        <Route
          path="/"
          element={
            <>
              {user ? (
                <>
                  <Togglable buttonLabel="New Post">
                    <BlogForm user={user} />
                  </Togglable>
                  <h2>blogs</h2>
                  <ul>
                    {blogs.map((blog) => (
                      <li key={blog.id} post={blog} user={user}>
                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <LoginForm />
              )}
            </>
          }
        />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:id" element={<User />} />
      </Routes>
    </div>
  );
};

export default App;
