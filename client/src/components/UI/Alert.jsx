import React from 'react';

const Alert = ({showAlert, children, ...props}) => {
  return (
    <>
      {showAlert &&
        <div {...props}>
          {children}
        </div>
      }
    </>
  );
};

export default Alert;