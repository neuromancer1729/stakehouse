import React from 'react';
import { Modal, Button } from '@react95/core';

const LoginModal = ({
  toggleLoginModal,
  logintoPortis,
  isMobile,
}) => {
  const boxProps = {
    width: isMobile ? window.innerWidth : 400,
    height: isMobile ? window.innerHeight - 30 : window.innerHeight - 300,
  };

  return (
    <Modal
      {...boxProps}
      style={{ top: 0 }}
      icon="bat_exec"
      title="Login"
      closeModal={() => toggleLoginModal(false)}
    >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          <div className="loginModal">
              <div className="loginRight">
                    Image here
              </div>
              <div className="loginMiddle"></div>
              <div className="loginLeft">
                        <div className="loginText">
                            Praeterea, ex culpa non invenies unum aut non accusatis unum. Et nihil inuitam. Nemo nocere tibi erit, et non inimicos, et ne illa laederentur.
                        </div>
                        <div className="logintoPortis">
                        <Button className="login" onClick={logintoPortis} value="Login vis Portis">Login vis Portis</Button>
                        </div>
              </div>
            </div>
        </div>
    </Modal>
  );
};

export default LoginModal;
