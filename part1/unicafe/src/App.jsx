import { useState } from "react";
import { Button } from "./components/button";
import { Statistics } from "./components/statistics";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button setState={setGood}>good</Button>
      <Button setState={setNeutral}>neutral</Button>
      <Button setState={setBad}>bad</Button>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
