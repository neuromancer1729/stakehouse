import React from 'react';
import DailyCo from '../components/DailyCo/index';
import { Modal } from '@react95/core';


const CallModal =({
roomName,
roomId,
existingRoomURL,
toggleCallModal,
updateRoomUrl,
isMobile,
}) => {
    const boxProps = {
        width: isMobile ? window.innerWidth : 600,
        height: isMobile ? window.innerHeight - 30 : window.innerHeight - 200,
      };

    return (
        <Modal
        {...boxProps}
        style={{ top: 0 }}
        icon="bat_exec"
        title={"Video chat " + roomName}
        closeModal={() => toggleCallModal(false)}
      >
          <div id={roomName}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
              
          </div>
          <DailyCo   
              element={roomName}
              roomName={roomName}
              roomId={roomId}
              existingRoomURL={existingRoomURL}
              toggleCallModal={toggleCallModal}
              updateRoomUrl={updateRoomUrl}
              />          
      </Modal>
    );
  };
  
  export default CallModal;