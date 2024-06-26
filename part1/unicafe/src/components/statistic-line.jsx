export const StatisticLine = ({ label, value }) => {
  return (
    <tr>
      <th>{label}</th>
      <td>{value}</td>
    </tr>
  );
};
