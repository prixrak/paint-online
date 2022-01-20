import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import '../styles/canvas.scss';
import Brush from './../tools/Brush';
import { useParams } from 'react-router-dom';
import sessionState from '../store/sessionState';
import Rect from './../tools/Rect';
import SocketDraw from '../socket/SocketDraw';
import Circle from './../tools/Circle';
import Eraser from '../tools/Eraser';
import Line from './../tools/Line';
import { getCanvas, postCanvas } from './../API/canvasAPI';

const Canvas = observer(() => {
  const canvasRef = useRef(null);
  const { id } = useParams(); // id of session

  const handleResize = () => {
    let ctx = canvasRef.current.getContext('2d');
    const img = new Image();
    img.src = canvasRef.current.toDataURL();
    canvasRef.current.width = window.innerWidth - 300;
    canvasRef.current.height = window.innerHeight - 200;
    img.onload = () => {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    window.addEventListener('resize', () => {
      handleResize();
    });
  }, []);

  useEffect(() => { 
    canvasRef.current.width = window.innerWidth - 300;
    canvasRef.current.height = window.innerHeight - 200;
    if(sessionState.username !== '') {
      canvasState.setCanvasId(id);
      let ctx = canvasRef.current.getContext('2d');
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

      socket.onmessage = async (e) => {
        const msg = JSON.parse(e.data);
        switch(msg.method) {
          case 'connection':
            if(msg.username !== sessionState.username) sessionState.setAlert({show: true, message:`User: ${msg.username}, come to draw with u :)` });
            else sessionState.setAlert({show: true, message: `Nice to see you here :)` });
            break;
          case 'draw':
            drawHandler(msg);
            break;
          case 'undoredo':
            await getCanvas(ctx, canvasRef.current, id);
            break;
          default:
            console.log('def');
        }
      }
      getCanvas(ctx, canvasRef.current, id);
    }
  }, [sessionState.username, id]);

  const drawHandler = (msg) => {
    const figure = msg.figure;
    const ctx = canvasRef.current.getContext('2d');
    switch (figure.type) {
      case "brush":
        Brush.drawStatic(ctx, figure.x, figure.y, figure.strokeStyle, figure.lineWidth);
        break;
      case "eraser":
        Eraser.drawStatic(ctx, figure.x, figure.y,figure.lineWidth);
        break;
      case "line":
        Line.drawStatic(ctx, figure.startX, figure.startY, figure.endX, figure.endY, figure.strokeStyle, figure.lineWidth);
        break;
      case "rect":
        Rect.drawStatic(ctx, figure.x, figure.y, figure.width, figure.height, figure.fillStyle, figure.strokeStyle, figure.lineWidth);
        break;
      case "circle":
        Circle.drawStatic(ctx, figure.x, figure.y, figure.r, figure.fillStyle, figure.strokeStyle, figure.lineWidth);
        break;
      case "finish":
        ctx.beginPath();
        break;
      default:
        console.log("def");
    }
  }

  const mouseDownHandler = () => {
    // drop styles of another user to current user settings

    let ctx = canvasRef.current.getContext('2d');
    ctx.fillStyle = toolState.fillStyle;
    ctx.strokeStyle = toolState.strokeStyle;
    ctx.lineWidth = toolState.lineWidth;

    //
    canvasState.pushToUndo(canvasRef.current.toDataURL());

  }

  const mouseUpHandler = () => { // when mouseUp on canvas -> save state of canvas in img and post it to server
    if(!canvasState.redoList.length) {
      postCanvas(canvasRef.current.toDataURL(), id)
    }
  }

  return (
    <div className='canvas'>
      <canvas 
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        ref={canvasRef} width={1600} height={1600}
      ></canvas>
    </div>
  );
});

export default Canvas;