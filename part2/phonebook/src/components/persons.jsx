import { useMemo } from "react";
import { PersonGateway } from "../gateways/person";

export const Persons = ({ persons, filterBy, setPersons }) => {
  const handleDelete = (person) => {
    confirm(`Are you sure you want to delete ${person.name}`) &&
      new PersonGateway()
        .delete(person.id)
        .then(() => setPersons(persons.filter((p) => p.id !== person.id)));
  };

  const filteredPersons = useMemo(() => {
    if (!filterBy) return persons;
    return persons.filter((person) =>
      person.name.toLowerCase().includes(filterBy.toLowerCase())
    );
  }, [filterBy, persons]);

  return (
    filteredPersons.length > 0 && (
      <ul>
        {filteredPersons.map((person) => (
          <li key={person.id}>
            {person.name} | {person.number}{" "}
            <button title="delete" onClick={() => handleDelete(person)}>
              x
            </button>
          </li>
        ))}
      </ul>
    )
  );
};
