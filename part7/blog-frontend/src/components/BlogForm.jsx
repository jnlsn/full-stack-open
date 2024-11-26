import css from "./BlogForm.module.css";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationsReducer";
import { createBlog } from "../reducers/blogsReducer";

export const BlogForm = ({ user }) => {
  const dispatch = useDispatch();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        if (!formData.get("title") || !formData.get("url")) {
          dispatch(setNotification("Enter a title and URL"));
          return;
        }
        try {
          const data = {
            title: formData.get("title"),
            author: formData.get("author"),
            url: formData.get("url"),
          };
          dispatch(createBlog(data, user.token)).then(() => {
            dispatch(setNotification(`${data.title} added`));
            form.reset();
          });
        } catch (e) {
          console.log(e);
          dispatch(setNotification("Could not add post"));
        }
      }}
    >
      <fieldset className={css.fields}>
        <legend>Create a new blog post</legend>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" name="title" type="text" />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input id="author" name="author" type="text" />
        </div>
        <div>
          <label htmlFor="url">URL</label>
          <input id="url" name="url" type="text" />
        </div>
      </fieldset>
      <button type="submit">submit</button>
    </form>
  );
};
