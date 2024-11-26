const baseUrl = "/api/blogs";

const getAll = () => {
  const request = fetch(baseUrl);
  return request.then((response) => response.json());
};

const create = (body, userToken) => {
  return fetch("/api/blogs", {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  }).then((res) => res.json());
};

const update = ({ id, ...body }, userToken) =>
  fetch(`/api/blogs/${id}`, {
    method: "put",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  }).then((res) => res.json());

const remove = (id, token) =>
  fetch(`/api/blogs/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export default { getAll, create, update, remove };
