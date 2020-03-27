import React from 'react';

const Header = ({ courses, courseName }) => {
  console.log('header', courses);

  return (
    <div>
      <h2>{courseName}</h2>
    </div>
  );
};
export default Header;
