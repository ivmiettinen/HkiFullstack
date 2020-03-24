import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// let Jono = Array.apply(null, new Array(6)).map(Number.prototype.valueOf, 0);

// console.log('jono:', Jono);

const points = [0, 0, 0, 0, 0, 0];

const alkuperaisenKopio = [...points];

const App = props => {
  const [selected, setSelected] = useState([
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]);
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0]);

  const handleRandomVote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const maksimi = Math.max(...alkuperaisenKopio);

  const missakohtaa = alkuperaisenKopio.indexOf(maksimi);

  console.log('missaKohtaa', missakohtaa);

  const handleVote = () => {
    // setVotes((JonoKopio[selected] += 1));

    setVotes(alkuperaisenKopio.concat(+0));

    alkuperaisenKopio[selected] += 1;

    console.log('votes state:', alkuperaisenKopio[selected]);
  };

  console.log('votes:', votes);

  return (
    <div>
      <button onClick={handleRandomVote}>Next Anecdote</button>
      {props.anecdotes[selected]}
      <button onClick={handleVote}>Vote</button>
      <p> {alkuperaisenKopio[selected]}</p>
      <p>Votes:{votes[selected]} statesta </p>
      <p>{alkuperaisenKopio[selected]} votes.</p>
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
