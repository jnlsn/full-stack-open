import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import { Notification, NotificationContext } from "./components/Notification";
import { useContext } from "react";

const App = () => {
  const queryClient = useQueryClient();
  const { setNotification } = useContext(NotificationContext);
  const voteMutation = useMutation({
    mutationFn: (anecdote) =>
      fetch(`http://localhost:3001/anecdotes/${anecdote.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ votes: anecdote.votes + 1 }),
      }).then((res) => res.json()),
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(
        ["anecdotes"],
        anecdotes.map((item) => (item.id === anecdote.id ? anecdote : item))
      );
      setNotification("You voted for: " + anecdote.content);
    },
    onError: (e) => {
      setNotification(e.message);
    },
  });

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote);
  };

  const anecdotes = useQuery({
    queryKey: ["anecdotes"],
    queryFn: () =>
      fetch("http://localhost:3001/anecdotes").then((res) => res.json()),
  });

  if (anecdotes.isLoading) {
    return <div>loading data...</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.data.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
