import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';
import canvasState from '../store/canvasState';
import '../styles/canvas.scss';


const Canvas = observer(() => {
  const canvasRef = useRef(null);

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
  }, []);

  return (
    <div className='canvas'>
      <canvas ref={canvasRef} width={1000} height={600}></canvas>
    </div>
  );
});

export default Canvas;