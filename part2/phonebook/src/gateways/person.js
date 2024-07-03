export class PersonGateway {
  #endpoint = "/api/persons";

  getAll() {
    return fetch(this.#endpoint).then((res) => res.json());
  }

  create(person) {
    return fetch(this.#endpoint, {
      method: "POST",
      body: JSON.stringify(person),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }

  delete(id) {
    return fetch(`${this.#endpoint}/${id}`, { method: "DELETE" });
  }

  update(id, person) {
    return fetch(`${this.#endpoint}/${id}`, {
      method: "PUT",
      body: JSON.stringify(person),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }
}
