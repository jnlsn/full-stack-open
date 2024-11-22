import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

export const AnecdoteForm = () => {
  const dispatch = useDispatch();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (!formData.get("content")) return;
        const form = e.currentTarget;
        dispatch(createAnecdote(formData.get("content"))).then(() => {
          form.reset();
        });
      }}
    >
      <div>
        <input name="content" type="text" />
      </div>
      <button type="submit">create</button>
    </form>
  );
};
