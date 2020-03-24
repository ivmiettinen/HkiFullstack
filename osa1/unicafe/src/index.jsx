import React, { useState } from 'react';
import ReactDOM from 'react-dom';

export const Button = ({ handleClick, text }) => {
  return (
    <div>
      <button onClick={handleClick}>{text}</button>
    </div>
  );
};

export const Statistics = ({
  clicks,
  good,
  neutral,
  bad,

  all,
  average,
  positivePercent
}) => {
  if (clicks.length === 0) {
    return (
      <div>
        <h3>statistics </h3>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <div>
      <h3>statistics</h3>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='all' value={all} />
      <StatisticLine text='average' value={average} />
      <StatisticLine text='positivePercent' value={positivePercent} />
    </div>
  );
};

export const StatisticLine = ({ text, value }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td width='110px'>{text}</td>
          <td width='150px'>{value}</td>
        </tr>
      </tbody>
    </table>
  );
};

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [zero, setZero] = useState(0);
  const [clicks, allClicks] = useState([]);

  const handleGood = () => {
    setGood(good + 1);
    allClicks(clicks.concat('C'));
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setZero(zero + 0);
    allClicks(clicks.concat('C'));
  };

  const handleBad = () => {
    setBad(bad + 1);
    allClicks(clicks.concat('C'));
  };

  const all = good + neutral + bad;

  const average = ((good + zero - bad) / all).toFixed(2);

  const positivePercent = ((good / all) * 100).toFixed(2) + ' %';

  return (
    <div>
      <h3>give feedback</h3>

      <Button handleClick={handleGood} text='good'></Button>

      <Button handleClick={handleNeutral} text='neutral'></Button>

      <Button handleClick={handleBad} text='bad'></Button>

      <Statistics
        clicks={clicks}
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positivePercent={positivePercent}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
