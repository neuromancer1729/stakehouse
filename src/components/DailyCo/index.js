import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import BrowserUnsupported from './components/BrowserUnsupported/BrowserUnsupported';
import DailyIframe from '@daily-co/daily-js';

const DailyCo = ({
  element,
}) => {
  return (  
          ReactDOM.render(
            DailyIframe.supportedBrowser().supported ? <App /> : <BrowserUnsupported />,
            document.getElementById(element)
          )
  )
}

export default DailyCo
