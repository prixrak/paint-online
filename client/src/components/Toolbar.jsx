import React, { useRef } from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import '../styles/toolbar.scss'
import Brush from './../tools/Brush';
import Rect from './../tools/Rect';
import Circle from './../tools/Circle';
import Line from './../tools/Line';
import Eraser from './../tools/Eraser';

const Toolbar = () => {
  let icon = useRef(null);

  let changeColor = (e) => {
    toolState.setFillColor(e.target.value);
    toolState.setStrokeColor(e.target.value)
    icon.current.style.color =  `${e.target.value}`;
  }
  
  return (
    <div className='toolbar'>
      <i data-hint='Draw by Brush' className="fas fa-paint-brush" onClick={() => toolState.setTool(new Brush(canvasState.canvas))}></i>
      <i data-hint='Draw Reactangle' className="fas fa-square" onClick={() => toolState.setTool(new Rect(canvasState.canvas))}></i>
      <i data-hint='Draw Circle' className="fas fa-circle" onClick={() => toolState.setTool(new Circle(canvasState.canvas))}></i>
      <i data-hint='Eraser' className="fas fa-eraser" onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}></i>
      <i data-hint='Draw Line' className="fab fa-line" onClick={() => toolState.setTool(new Line(canvasState.canvas))}></i>
      <i data-hint='Set color of tool' ref={icon} className="fas fa-palette">
        <input type="color" onChange={e => changeColor(e)} id="fill-color"/>
      </i>

    </div>
  );
};

export default Toolbar;