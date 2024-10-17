const baseUrl = "/api/blogs";

const getAll = () => {
  const request = fetch(baseUrl);
  return request.then((response) => response.json());
};

export default { getAll };
