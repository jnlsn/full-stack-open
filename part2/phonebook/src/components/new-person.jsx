import { PersonGateway } from "../gateways/person";

export const NewPersonForm = ({
  person,
  onPersonChange,
  persons,
  setPersons,
}) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const personGateway = new PersonGateway();
    const existingPerson = persons.find((p) => p.name === person.name);
    if (existingPerson) {
      confirm(
        `${person.name} is already in the phonebook. Shall we update their info?`
      )
        ? personGateway.update(existingPerson.id, person).then((data) => {
            setPersons(persons.map((p) => (p.id === data.id ? data : p)));
            onPersonChange({ name: "", number: "" });
          })
        : onPersonChange({ name: "", number: "" });
    } else {
      personGateway.create(person).then((data) => {
        setPersons([...persons, data]);
        onPersonChange({ name: "", number: "" });
      });
    }
  };

  return (
    <form onSubmit={onSubmit}>
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
