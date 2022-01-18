import { observer } from 'mobx-react-lite';
import React from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import '../styles/settingbar.scss'

const SettingBar = observer(() => {

  return (
    <div className='settingbar'>
      <input
        data-hint='Line Width'
        onChange={e => toolState.setLineWidth(e.target.value)}
        type="number" 
        id='line-width'
        defaultValue={1} min={1} max={50}/>
      <input 
        data-hint='Border Color' 
        onChange={e => toolState.setStrokeColor(e.target.value)} 
        type="color"/>
      <i className="fas fa-undo left" onClick={() => canvasState.undo()}></i>
      <i className="fas fa-redo" onClick={() => canvasState.redo()}></i>
      <i className="fas fa-save"></i>
    </div>
  );
});

export default SettingBar;