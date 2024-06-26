export const Button = ({ setState, children }) => {
  const onClick = () => setState((prev) => prev + 1);
  return <button onClick={onClick}>{children}</button>;
};
