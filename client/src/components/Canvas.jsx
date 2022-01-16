import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import '../styles/canvas.scss';
import Brush from './../tools/Brush';


const Canvas = observer(() => {
  const canvasRef = useRef(null);

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    toolState.setTool(new Brush(canvasRef.current));
  }, []);

  return (
    <div className='canvas'>
      <canvas 
        onMouseDown={e => canvasState.pushToUndo(e.target.toDataURL())}
        ref={canvasRef} width={1000} height={600}
      ></canvas>
    </div>
  );
});

export default Canvas;