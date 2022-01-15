import React from 'react';
import '../styles/settingbar.scss'

const SettingBar = () => {
  return (
    <div className='settingbar'>
      <i className="fas fa-undo left"></i>
      <i className="fas fa-redo"></i>
      <i className="fas fa-save"></i>
    </div>
  );
};

export default SettingBar;