import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import '../styles/canvas.scss';
import Brush from './../tools/Brush';
import Button from './Button';
import Input from './Input';
import Modal from './Modal';
import { useParams } from 'react-router-dom';
import sessionState from '../store/sessionState';


const Canvas = observer(() => {
  const canvasRef = useRef(null);
  const usernameRef = React.createRef();
  const [modalShow, setModalShow] = useState(true);
  const { id } = useParams(); // id of session

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    toolState.setTool(new Brush(canvasRef.current));
  }, []);

  useEffect(() => { 
    if(sessionState.username !== '') {
      const socket = new WebSocket('ws://localhost:5000/');
      sessionState.setSocket(socket);
      sessionState.setSessionId(id);
      socket.onopen = () => {
        socket.send(JSON.stringify({
          method: 'connection',
          id: id,
          username: canvasState.username
        }));
      };
      socket.onmessage = (e) => {
        console.log(e.data);
      }
    }
  }, [sessionState.username]);

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