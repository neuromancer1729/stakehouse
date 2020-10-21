import React from 'react';
import { Modal } from '@react95/core';
import PictureUploader from './PictureUploader';
import md5 from 'md5';

const SettingsModal =({
    toggleSettingModal,
    isMobile, 
    email,
}) => {
    const emailText = email === undefined ? "" : email;
    const boxProps = {
        width: isMobile ? window.innerWidth : 400,
        height: isMobile ? window.innerHeight - 30 : window.innerHeight - 300,
      };

      return (
        <Modal
          {...boxProps}
          style={{ top: 0 }}
          icon="folder_settings"
          title="Settings"
          closeModal={() => toggleSettingModal(false)}
        >          
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignSelf: 'center',
              }}
            >              
              <img src={"https://www.gravatar.com/avatar/" + md5(emailText) + "?s=100"} />
              
            </div>
            <span className="userName">{emailText}</span>
        </Modal>
      );
    };

    export default SettingsModal