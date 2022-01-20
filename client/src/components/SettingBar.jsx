import { observer } from 'mobx-react-lite';
import React from 'react';
import canvasState from '../store/canvasState';
import sessionState from '../store/sessionState';
import toolState from '../store/toolState';
import '../styles/settingbar.scss'

const SettingBar = observer(() => {

  const download = () => {
    const dataUrl = canvasState.canvas.toDataURL();
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = sessionState.socketDraw.sessionId + ".jpg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <div className='settingbar'>
      <input
        className='settingbar__item settingbar__item-left'
        data-hint='Line Width'
        onChange={e => toolState.setLineWidth(e.target.value)}
        type="number" 
        id='line-width'
        defaultValue={1} min={1} max={50}/>
      <input 
        className='settingbar__item settingbar__item-left'
        data-hint='Border Color' 
        onChange={e => toolState.setStrokeColor(e.target.value)} 
        type="color"/>
      <i data-hint='Undo' className="fas fa-undo left settingbar__item settingbar__item-right" onClick={() => {
      if(canvasState.undoList.length > 0) {
        canvasState.undo();
        sessionState.socketDraw.undoRedo();
      }
      }}></i>
      <i data-hint='Redo' className="fas fa-redo settingbar__item settingbar__item-right" onClick={() => {
        if(canvasState.redoList.length > 0) {
          canvasState.redo();
          sessionState.socketDraw.undoRedo();
        }
      }}></i>
      <i data-hint='Save' className="fas fa-save settingbar__item settingbar__item-right" onClick={() => download()}></i>
    </div>
  );
});

export default SettingBar;