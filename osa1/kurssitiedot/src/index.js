import React from 'react';
import ReactDOM from 'react-dom';

export const Header = props => {
  return (
    <div>
      {' '}
      <h1>{props.course}</h1>
    </div>
  );
};

export const Content = props => {
  console.log('content', props);

  return (
    <div>
      <Part1 parts={props.parts} />
      <Part2 parts={props.parts} />
      <Part3 parts={props.parts} />
    </div>
  );
};

export const Part1 = props => {
  console.log('part1:', props.parts[0].name);

  return (
    <div>
      <p>{props.parts[0].name}</p>
      <p>{props.parts[0].exercises}</p>
    </div>
  );
};

export const Part2 = props => {
  return (
    <div>
      <p>{props.parts[1].name}</p>
      <p>{props.parts[1].exercises}</p>
    </div>
  );
};
export const Part3 = props => {
  return (
    <div>
      <p>{props.parts[2].name}</p>
      <p>{props.parts[2].exercises}</p>
    </div>
  );
};

export const Total = props => {
  return (
    <div>
      <p>
        Number of exercises:{' '}
        {props.parts[0].exercises +
          props.parts[1].exercises +
          props.parts[2].exercises}
      </p>
    </div>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
