import { useState } from "react";
import { Filter } from "./components/filter";
import { Persons } from "./components/persons";
import { NewPersonForm } from "./components/new-person";
import { useEffect } from "react";
import { PersonGateway } from "./gateways/person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filterBy, setFilterBy] = useState("");

  useEffect(() => {
    new PersonGateway().getAll().then((data) => setPersons(data));
  }, []);

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
      <Persons persons={persons} setPersons={setPersons} filterBy={filterBy} />
    </div>
  );
};

export default App;
