import React from 'react';

const Persons = ({ results, buttoni, handleDelete }) => {
  let mapping = results.map((result) => {
    return (
      <li key={result.id}>
        {result.name} {result.number}
        <button onClick={handleDelete} value={result.id}>
          Delete
        </button>
      </li>
    );
  });
  console.log('pituus:', mapping.length);

  return <>{mapping}</>;
};

export default Persons;
