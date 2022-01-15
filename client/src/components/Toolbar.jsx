import React from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import '../styles/toolbar.scss'
import Brush from './../tools/Brush';
const Toolbar = () => {
  return (
    <div className='toolbar'>
      <i className="fas fa-paint-brush" onClick={() => toolState.setTool(new Brush(canvasState.canvas))}></i>
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