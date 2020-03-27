import React from 'react';
import Part from './Part';
import AllTasksSum from './TaskSum';

const Content = ({ courses, name }) => {
  console.log('Content', courses);

  console.log('Content, parts', courses);

  const taskSum = courses.parts.reduce(
    (sum, order) => sum + order.exercises,
    0
  );

  return (
    <div>
      <h4>{name}</h4>{' '}
      {courses.parts.map(courses => (
        <Part
          name={courses.name}
          exercises={courses.exercises}
          key={courses.id}
        />
      ))}
      <h4>
        <AllTasksSum taskSum={taskSum} />
      </h4>
    </div>
  );
};

export default Content;
