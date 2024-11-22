import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { NotificationContext } from "./Notification";

const AnecdoteForm = () => {
  const { setNotification } = useContext(NotificationContext);
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: (anecdote) =>
      fetch("http://localhost:3001/anecdotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(anecdote),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            throw new Error(res.error);
          }
          return res;
        }),
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
    },
    onError: (e) => {
      setNotification(e.message);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
