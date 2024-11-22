const baseUrl = "http://localhost:3001/anecdotes";

const get = (id) => fetch(`${baseUrl}/${id}`).then((res) => res.json());

const getAll = () => fetch(baseUrl).then((res) => res.json());

const createNew = (content) =>
  fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, votes: 0 }),
  }).then((res) => res.json());

const patch = (id, fields) =>
  fetch(`${baseUrl}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fields),
  }).then((res) => res.json());

export default { get, getAll, createNew, patch };
