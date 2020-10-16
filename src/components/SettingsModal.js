import React from 'react';
import { Modal } from '@react95/core';
import PictureUploader from './PictureUploader';

const SettingsModal =({
    toggleSettingModal,
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
          title="Settings"
          closeModal={() => toggleSettingModal(false)}
        >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              <PictureUploader />
            </div>
        </Modal>
      );
    };

    export default SettingsModal