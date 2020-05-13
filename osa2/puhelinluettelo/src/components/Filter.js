import React from 'react';

const Filter = ({ handleNameFilter, searchTerm }) => {
  return (
    <div>
      Filter shown with
      <input
        value={searchTerm}
        onChange={handleNameFilter}
        placeholder='Search'
      />
    </div>
  );
};

export default Filter;
