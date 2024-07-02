import { useState } from "react";
import { PersonGateway } from "../gateways/person";
import { Alert } from "./alert";

export const NewPersonForm = ({
  person,
  onPersonChange,
  persons,
  setPersons,
}) => {
  const [message, setMessage] = useState({ message: "" });
  const onSubmit = (e) => {
    e.preventDefault();
    const personGateway = new PersonGateway();
    const existingPerson = persons.find((p) => p.name === person.name);
    if (existingPerson) {
      confirm(
        `${person.name} is already in the phonebook. Shall we update their info?`
      )
        ? personGateway
            .update(existingPerson.id, person)
            .then((data) => {
              setMessage({
                message: `Updated contact: ${person.name}`,
                variant: "success",
              });
              setPersons(persons.map((p) => (p.id === data.id ? data : p)));
              onPersonChange({ name: "", number: "" });
            })
            .catch(() => {
              setMessage({
                message: `${person.name} does not exist on the server`,
                variant: "error",
              });
            })
        : onPersonChange({ name: "", number: "" });
    } else {
      personGateway.create(person).then((data) => {
        setMessage({
          message: `Created contact: ${person.name}`,
          variant: "success",
        });
        setPersons([...persons, data]);
        onPersonChange({ name: "", number: "" });
      });
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Alert {...message} />
      <div>
        name:{" "}
        <input
          value={person.name}
          onChange={(e) => onPersonChange({ ...person, name: e.target.value })}
        />
      </div>
      <div>
        number:{" "}
        <input
          value={person.number}
          onChange={(e) =>
            onPersonChange({ ...person, number: e.target.value })
          }
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
