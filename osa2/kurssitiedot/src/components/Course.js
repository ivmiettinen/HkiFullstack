import React from 'react';
import Header from './Header';
import Content from './Content';

const Course = ({ course, courseName }) => {
  console.log('kurssi', course);
  console.log('Course:', courseName);

  return (
    <div>
      <ul>
        <Header courseName={courseName} />

        {course.map(courses => (
          <Content courses={courses} name={courses.name} key={courses.id} />
        ))}
      </ul>
    </div>
  );
};

export default Course;
