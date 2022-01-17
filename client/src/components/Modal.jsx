import React, {useCallback, useRef} from 'react';
import '../styles/modal.scss';

const Modal = ({isShow, closeMethod, children}) => {
  const modalBackground = useRef(null);

  const closeModalOnClickBackground = useCallback((e) => {
    if(modalBackground.current === e.target) closeMethod()
  }, [closeMethod]);

  return (
    <>
      {isShow &&
        <div ref={modalBackground} className="modal">
          <div className="modal__dialog">
            <div className="modal__content">
              <form>
                {children}
              </form>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Modal;