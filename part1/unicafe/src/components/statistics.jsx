import { StatisticLine } from "./statistic-line";

export const Statistics = ({ good, bad, neutral }) => {
  const total = good + bad + neutral;
  const average = Math.round(((good - bad) / total) * 10) / 10;
  const positive = Math.round((good / total) * 100);
  return (
    <>
      <h1>Statistics</h1>
      {Boolean(good || bad || neutral) ? (
        <table>
          <tbody>
            <StatisticLine label="good" value={good} />
            <StatisticLine label="bad" value={bad} />
            <StatisticLine label="neutral" value={neutral} />
            <StatisticLine label="all" value={total} />
            <StatisticLine label="average" value={average} />
            <StatisticLine label="positive" value={`${positive}%`} />
          </tbody>
        </table>
      ) : (
        <p>no feedback given</p>
      )}
    </>
  );
};
