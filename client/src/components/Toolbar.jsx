import React from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import '../styles/toolbar.scss'
import Brush from './../tools/Brush';
import Rect from './../tools/Rect';
import Circle from './../tools/Circle';
import Line from './../tools/Line';
const Toolbar = () => {
  return (
    <div className='toolbar'>
      <i className="fas fa-paint-brush" onClick={() => toolState.setTool(new Brush(canvasState.canvas))}></i>
      <i className="fas fa-square" onClick={() => toolState.setTool(new Rect(canvasState.canvas))}></i>
      <i className="fas fa-circle" onClick={() => toolState.setTool(new Circle(canvasState.canvas))}></i>
      <i className="fas fa-eraser"></i>
      <i className="fab fa-line" onClick={() => toolState.setTool(new Line(canvasState.canvas))}></i>
      <label>
        <i className="fas fa-palette"></i>
        <input type="color" />
      </label>
    </div>
  );
};

export default Toolbar;