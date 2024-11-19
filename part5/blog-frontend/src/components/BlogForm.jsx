import { useState } from "react";
import blogService from "../services/blogs";
import css from "./BlogForm.module.css";

export const BlogForm = ({ user, onSuccess }) => {
  const [message, setMessage] = useState("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        if (!formData.get("title") || !formData.get("url")) {
          setMessage("Enter a title and URL");
          return;
        }
        try {
          const data = {
            title: formData.get("title"),
            author: formData.get("author"),
            url: formData.get("url"),
          };
          const post = await blogService.create(data, user.token);
          setMessage(`${post.title} added`);
          onSuccess && onSuccess(data);
          form.reset();
        } catch (e) {
          console.log(e);
          setMessage("Could not add post");
        }
      }}
    >
      <fieldset className={css.fields}>
        <legend>Create a new blog post</legend>
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
      </fieldset>
      <button type="submit">submit</button>
    </form>
  );
};
