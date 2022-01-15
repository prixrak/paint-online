import React from 'react';
import '../styles/toolbar.scss'
const Toolbar = () => {
  return (
    <div className='toolbar'>
      <i className="fas fa-paint-brush"></i>
      <i className="fas fa-square"></i>
      <i className="fas fa-circle"></i>
      <i className="fas fa-eraser"></i>
      <i className="fab fa-line"></i>
      <label>
        <i className="fas fa-palette"></i>
        <input type="color" />
      </label>
    </div>
  );
};

export default Toolbar;