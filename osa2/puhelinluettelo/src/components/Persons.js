import React from 'react';

const Persons = ({ results }) => {
  let mapping = results.map(result => {
    return (
      <li key={result.name}>
        {result.name} {result.number}
      </li>
    );
  });

  return <>{mapping}</>;
};

export default Persons;
