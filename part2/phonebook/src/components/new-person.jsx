export const NewPersonForm = ({
  person,
  onPersonChange,
  persons,
  setPersons,
}) => {
  const onSubmit = (e) => {
    e.preventDefault();
    if (persons.some((p) => p.name === person.name)) {
      return alert(`${person.name} is already in the phonebook.`);
    }
    setPersons([...persons, person]);
    onPersonChange({ name: "", phone: "" });
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
          value={person.phone}
          onChange={(e) => onPersonChange({ ...person, phone: e.target.value })}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
