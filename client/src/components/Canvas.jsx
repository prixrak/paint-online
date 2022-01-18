/* eslint-disable default-case */
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import '../styles/canvas.scss';
import Brush from './../tools/Brush';
import Button from './UI/Button';
import Input from './UI/Input';
import Modal from './UI/Modal';
import { useParams } from 'react-router-dom';
import sessionState from '../store/sessionState';
import Rect from './../tools/Rect';
import SocketDraw from '../socket/SocketDraw';
import axios from 'axios';

const Canvas = observer(() => {
  const canvasRef = useRef(null);
  const { id } = useParams(); // id of session

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
  }, []);

  useEffect(() => { 
    if(sessionState.username !== '') {
      const socket = new WebSocket('ws://localhost:5000/');
      sessionState.setSocketDraw(new SocketDraw(socket, id));
      toolState.setTool(new Brush(canvasRef.current, sessionState.socketDraw));
      socket.onopen = () => {
        socket.send(JSON.stringify({
          method: 'connection',
          id: id,
          username: sessionState.username
        }));
      };

      socket.onmessage = (e) => {
        const msg = JSON.parse(e.data);
        switch(msg.method) {
          case 'connection':
            if(msg.username !== sessionState.username) sessionState.setAlert({show: true, message:`User: ${msg.username}, come to draw with u :)` });
            else sessionState.setAlert({show: true, message: `Nice to see you here :)` });
            break;
          case 'draw':
            drawHandler(msg);
            break;
        }
      }
      let ctx = canvasRef.current.getContext('2d')
      axios.get(`http://localhost:5000/image?id=${id}`)
          .then(response => {
              const img = new Image();
              img.src = response.data;
              img.onload = () => {
                  ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                  ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
              }
          });
    }
  }, [sessionState.username, id]);

  const drawHandler = (msg) => {
    const figure = msg.figure;
    const ctx = canvasRef.current.getContext('2d');
    switch (figure.type) {
      case "brush":
        Brush.draw(ctx, figure.x, figure.y, figure.strokeStyle);
        break;
      case "rect":
        Rect.drawStatic(ctx, figure.x, figure.y, figure.width, figure.height, figure.fillStyle, figure.strokeStyle);
        break;
      case "finish":
        ctx.beginPath();
        break;
    }
  }

  const mouseDownHandler = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL());
  }

  const mouseUpHandler = () => { // when mouseUp on canvas -> save state of canvas in img and post it to server
    axios.post(`http://localhost:5000/image?id=${id}`, {img: canvasRef.current.toDataURL()});
  }

  return (
    <div className='canvas'>
      <canvas 
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        ref={canvasRef} width={1000} height={600}
      ></canvas>
    </div>
  );
});

export default Canvas;