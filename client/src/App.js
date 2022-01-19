import React from 'react';
import './styles/app.scss';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ModalUser from './pages/ModalUser';
import Main from './pages/Main';

const App = () => {
  return (
    <BrowserRouter>
      <div className='app'>
        <Routes>
          <Route path='/:id' element={
            <React.Fragment>
              <ModalUser />
              <Main />
            </React.Fragment>
          }>
          </Route>
          <Route path="*" element={<Navigate to={`f${(+new Date()).toString(16)}`} />}/>  
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
