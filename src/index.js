import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import Alert from '@mui/material/Alert';
import { BrowserRouter } from "react-router-dom";
// import AlertTemplate from 'react-alert-template-basic'

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

const AlertTemplate = ({ style, options, message, close }) => (
  <div style={style}>
    
    {options.type === 'info' && <Alert onClose={close} severity="info">{message}</Alert>}
    {options.type === 'success' && <Alert onClose={close} severity="success">{message}</Alert>}
    {options.type === 'error' && <Alert onClose={close} severity="error">{message}</Alert>}
    {/* <button onClick={close}>X</button> */}
  </div>
)

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
