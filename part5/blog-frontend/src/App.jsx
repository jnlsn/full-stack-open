import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import { LoginForm } from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  const logout = () => {
    window.localStorage.removeItem("loggedAppUser");
    setUser(null);
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
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const data = new FormData(form);
              if (!data.get("title") || !data.get("url")) {
                setMessage("Enter a title and URL");
                return;
              }
              try {
                const res = await fetch("/api/blogs", {
                  method: "post",
                  body: JSON.stringify({
                    title: data.get("title"),
                    author: data.get("author"),
                    url: data.get("url"),
                  }),
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                  },
                });
                const post = await res.json();
                setMessage(`${post.title} added`);
                form.reset();
              } catch (e) {
                console.log(e);
                setMessage("Could not add post");
              }
            }}
          >
            <div>
              <label for="title">Title</label>
              <input id="title" name="title" type="text" />
            </div>
            <div>
              <label for="author">Author</label>
              <input id="author" name="author" type="text" />
            </div>
            <div>
              <label for="url">URL</label>
              <input id="url" name="url" type="text" />
            </div>
            {message && (
              <div role="alert" aria-live="assertive">
                {message}
              </div>
            )}
            <button type="submit">submit</button>
          </form>
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      ) : (
        <LoginForm setUser={setUser} />
      )}
    </div>
  );
};

export default App;
