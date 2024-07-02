export const Filter = ({ value, onValueChange }) => {
  return (
    <div>
      filter shown with{" "}
      <input
        type="text"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
      />
    </div>
  );
};
