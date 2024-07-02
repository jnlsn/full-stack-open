import { useMemo } from "react";
import { useState } from "react";
import { Filter } from "./components/filter";
import { Persons } from "./components/persons";
import { NewPersonForm } from "./components/new-person";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "111-111-1111" },
  ]);
  const [newPerson, setNewPerson] = useState({ name: "", phone: "" });
  const [filterBy, setFilterBy] = useState("");

  const filteredPersons = useMemo(() => {
    if (!filterBy) return persons;
    return persons.filter((person) =>
      person.name.toLowerCase().includes(filterBy.toLowerCase())
    );
  }, [filterBy, persons]);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterBy} onValueChange={setFilterBy} />
      <h2>add a new</h2>
      <NewPersonForm
        onPersonChange={setNewPerson}
        person={newPerson}
        persons={persons}
        setPersons={setPersons}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
