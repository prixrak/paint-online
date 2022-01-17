import React from 'react';
import Canvas from './components/Canvas';
import Icon from './components/Icon';
import SettingBar from './components/SettingBar';
import Toolbar from './components/Toolbar';
import './styles/app.scss';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <div className='app'>
        <Routes>
          <Route path='/:id' element={
            <React.Fragment>
              <Icon />
              <Toolbar />
              <SettingBar />
              <Canvas />
            </React.Fragment>
          }>
          </Route>
          <Route path="*" element={<Navigate to={`f${(+new Date).toString(16)}`} />}/>  
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
