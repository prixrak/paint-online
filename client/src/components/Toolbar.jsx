import React, { useRef } from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import '../styles/toolbar.scss'
import Brush from './../tools/Brush';
import Rect from './../tools/Rect';
import Circle from './../tools/Circle';
import Line from './../tools/Line';
import Eraser from './../tools/Eraser';
import sessionState from '../store/sessionState';
import { observer } from 'mobx-react-lite';

const Toolbar = observer(() => {
  let icon = useRef(null);

  let changeColor = (e) => {
    toolState.setFillColor(e.target.value);
    toolState.setStrokeColor(e.target.value)
    icon.current.style.color =  `${e.target.value}`;
  }
  
  return (
    <div className='toolbar'>
      <i data-hint='Draw by Brush' className="fas fa-paint-brush toolbar__icon" onClick={() => toolState.setTool(new Brush(canvasState.canvas, sessionState.socketDraw ))}></i>
      <i data-hint='Draw Reactangle' className="fas fa-square toolbar__icon" onClick={() => toolState.setTool(new Rect(canvasState.canvas, sessionState.socketDraw))}></i>
      <i data-hint='Draw Circle' className="fas fa-circle toolbar__icon" onClick={() => toolState.setTool(new Circle(canvasState.canvas, sessionState.socketDraw))}></i>
      <i data-hint='Eraser' className="fas fa-eraser toolbar__icon" onClick={() => toolState.setTool(new Eraser(canvasState.canvas, sessionState.socketDraw))}></i>
      <i data-hint='Draw Line' className="fab fa-line toolbar__icon" onClick={() => toolState.setTool(new Line(canvasState.canvas, sessionState.socketDraw))}></i>
      <i data-hint='Set color of tool' ref={icon} className="fas fa-palette toolbar__icon">
        <input type="color" onChange={e => changeColor(e)} id="fill-color"/>
      </i>

    </div>
  );
});

export default Toolbar;