export const Persons = ({ persons }) => {
  return (
    persons.length > 0 && (
      <ul>
        {persons.map((person) => (
          <li key={person.name}>
            {person.name} | {person.phone}
          </li>
        ))}
      </ul>
    )
  );
};
