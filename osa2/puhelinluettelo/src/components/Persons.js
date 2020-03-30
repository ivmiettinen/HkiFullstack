import React from 'react';

const Persons = ({ names, number }) => {
  console.log('propsit', names);
  return (
    <li>
      Name: {names.name}, number: {names.number}{' '}
    </li>
  );
};

export default Persons;
