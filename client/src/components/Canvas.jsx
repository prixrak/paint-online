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


const Canvas = observer(() => {
  const canvasRef = useRef(null);
  const usernameRef = React.createRef();
  const [modalShow, setModalShow] = useState(true);
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
            if(msg.username !== sessionState.username) console.log("User: " + msg.username + ", come to draw with u :)");
            else console.log("Nice to see you here :)");
            break;
          case 'draw':
            drawHandler(msg);
            break;
        }
      }
    }
  }, [sessionState.username, id]);

  const drawHandler = (msg) => {
    const figure = msg.figure;
    const ctx = canvasRef.current.getContext('2d');
    switch (figure.type) {
      case "brush":
        Brush.draw(ctx, figure.x, figure.y);
        break;
      case "rect":
        Rect.drawStatic(ctx, figure.x, figure.y, figure.width, figure.height);
        break;
      case "finish":
        ctx.beginPath();
        break;
    }
  }

  const connectHandler = () => {
    if(usernameRef.current?.value !== '') {
      sessionState.setUsername(usernameRef.current.value);
      setModalShow(false);
    }
  } 

  return (
    <div className='canvas'>
      <Modal isShow={modalShow} submitMethod={connectHandler} closeMethod={() => setModalShow(false)}>
        <Input ref={usernameRef} required placeholder="Your username" name="name" type="text" className="modal__input" />
        <Button onClick={() => connectHandler()} className='btn'>Log In</Button>
      </Modal>
      <canvas 
        onMouseDown={e => canvasState.pushToUndo(e.target.toDataURL())}
        ref={canvasRef} width={1000} height={600}
      ></canvas>
    </div>
  );
});

export default Canvas;