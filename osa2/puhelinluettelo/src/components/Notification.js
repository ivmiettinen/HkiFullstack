import React from 'react';

const Notification = ({ errorMessage, successMessage }) => {
  if (successMessage !== null) {
    return <div className='success'>{successMessage}</div>;
  } else if (errorMessage === null) {
    return null;
  } else if (errorMessage !== null) {
    return <div className='error'>{errorMessage}</div>;
  } else if (successMessage === null) {
    return null;
  }
};

export default Notification;
