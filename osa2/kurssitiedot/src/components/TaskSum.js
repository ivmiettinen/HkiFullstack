import React from 'react';

const AllTasksSum = ({ taskSum }) => {
  console.log('props', taskSum);

  return <>Total of {taskSum} exercises</>;
};
export default AllTasksSum;
