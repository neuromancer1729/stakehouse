import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import BrowserUnsupported from './components/BrowserUnsupported/BrowserUnsupported';
import DailyIframe from '@daily-co/daily-js';

const DailyCo = ({
  roomName,
  roomId,
  existingRoomURL,
  toggleCallModal,
  updateRoomUrl,
}) => {
  return (  
            DailyIframe.supportedBrowser().supported ? <App  
            roomName={roomName} 
            roomId={roomId} 
            existingRoomURL={existingRoomURL}
            toggleCallModal={toggleCallModal} 
            updateRoomUrl={updateRoomUrl} /> : <BrowserUnsupported />
  )
}

export default DailyCo
