import React, { useState } from 'react';
import sessionState from '../store/sessionState';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import Modal from '../components/UI/Modal';

const ModalUser = () => {
  const usernameRef = React.createRef();
  const [modalShow, setModalShow] = useState(true);

  const connectHandler = () => {
    if(usernameRef.current?.value !== '') {
      sessionState.setUsername(usernameRef.current.value);
      setModalShow(false);
    }
  } 
  
  return (
    <Modal isShow={modalShow} submitMethod={connectHandler} closeMethod={() => setModalShow(false)}>
      <Input ref={usernameRef} required placeholder="Your username" name="name" type="text" className="modal__input" />
      <Button onClick={() => connectHandler()} className='btn'>Log In</Button>
    </Modal>
  );
};

export default ModalUser;