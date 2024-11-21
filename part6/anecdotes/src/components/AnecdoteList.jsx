import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import {
  clearNotification,
  setNotification,
} from "../reducers/notificationsReducer";
import { useRef } from "react";

export const AnecdoteList = () => {
  const notificationRef = useRef();
  const anecdotes = useSelector((state) =>
    state.anecdotes
      .filter((item) =>
        item.content.toLowerCase().includes(state.filter.toLowerCase())
      )
      .sort((a, b) => b.votes - a.votes)
  );
  const dispatch = useDispatch();

  const vote = (id) => {
    const anecdote = anecdotes.find((item) => item.id === id);
    dispatch(voteAnecdote(id));
    dispatch(setNotification(`You voted for: "${anecdote.content}"`));
    if (notificationRef.current) clearTimeout(notificationRef.current);
    notificationRef.current = setTimeout(() => {
      dispatch(clearNotification());
      notificationRef.current = null;
    }, 5000);
  };

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        {anecdote.id} has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  ));
};
