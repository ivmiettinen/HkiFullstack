import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const points = Array.apply(null, new Array(6)).map(Number.prototype.valueOf, 0);

const App = () => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(0);

  const handleRandomVote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  console.log('pituus', setSelected.length);

  const maximumPoints = Math.max(...points);

  const popularAnecdote = points.indexOf(maximumPoints);

  let copyOfAnecdotes = [...anecdotes];

  const handleVote = () => {
    points[selected] += 1;

    setVotes({ ...points });
  };

  if (votes === 0) {
    return (
      <div>
        <h3>Anecdote of the day:</h3>
        <p>"{anecdotes[selected]}"</p>
        <p>has 0 votes.</p>
        <button onClick={handleRandomVote}>Next Anecdote</button>
        <p></p>
        <button onClick={handleVote}>Vote</button>

        <h3>Anecdote with most votes: </h3>
        <p>
          "{copyOfAnecdotes[popularAnecdote]}" has {maximumPoints} votes.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3>Anecdote of the day:</h3>
      <p>"{anecdotes[selected]}"</p>
      <p>has {votes[selected]} votes.</p>
      <button onClick={handleRandomVote}>Next Anecdote</button>
      <p></p>
      <button onClick={handleVote}>Vote</button>

      <h3>Anecdote with most votes: </h3>
      <p>
        "{copyOfAnecdotes[popularAnecdote]}" has {maximumPoints} votes.
      </p>
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
