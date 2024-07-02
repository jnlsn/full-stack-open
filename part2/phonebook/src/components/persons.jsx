export const Persons = ({ persons }) => {
  return (
    persons.length > 0 && (
      <ul>
        {persons.map((person) => (
          <li key={person.id}>
            {person.name} | {person.number}
          </li>
        ))}
      </ul>
    )
  );
};
