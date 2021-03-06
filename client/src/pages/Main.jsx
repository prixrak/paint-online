import React, {useEffect} from 'react';
import Icon from './../components/Icon';
import Toolbar from './../components/Toolbar';
import SettingBar from './../components/SettingBar';
import Canvas from '../components/Canvas';
import Alert from '../components/UI/Alert';
import sessionState from '../store/sessionState';
import { observer } from 'mobx-react-lite';
import '../styles/alert.scss'
import canvasState from '../store/canvasState';
const Main = observer(() => {
  useEffect(() => {

  },[]);

  return (
    <>
      <Icon />
      <Toolbar />
      <SettingBar />
      <Canvas />
      <Alert className='alertTop alert' showAlert={sessionState.alert.show}>{sessionState.alert.message}</Alert>
    </>
  );
});

export default Main;