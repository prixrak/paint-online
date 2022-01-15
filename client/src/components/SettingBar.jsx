import React from 'react';
import toolState from '../store/toolState';
import '../styles/settingbar.scss'

const SettingBar = () => {
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
      <i className="fas fa-undo left"></i>
      <i className="fas fa-redo"></i>
      <i className="fas fa-save"></i>
    </div>
  );
};

export default SettingBar;