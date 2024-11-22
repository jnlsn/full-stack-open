import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    updateAnecdote(state, action) {
      const anecdote = action.payload;
      return state.map((item) => (item.id === anecdote.id ? anecdote : item));
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(anecdoteSlice.actions.setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content);
    dispatch(anecdoteSlice.actions.createAnecdote(anecdote));
  };
};

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    let anecdote = await anecdoteService.get(id);
    anecdote = await anecdoteService.patch(id, {
      votes: anecdote.votes + 1,
    });
    console.log(anecdote);
    dispatch(anecdoteSlice.actions.updateAnecdote(anecdote));
  };
};

export default anecdoteSlice.reducer;
