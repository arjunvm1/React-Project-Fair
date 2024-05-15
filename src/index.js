import React from 'react';
import ReactDOM from 'react-dom/client';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './bootstrap.min (3).css'
import "@fortawesome/fontawesome-free/css/all.min.css";
import ContextShare from './context/ContextShare';
import TokenAuth from './context/TokenAuth';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <ContextShare>
    <BrowserRouter>
    <TokenAuth>
    <App />
    </TokenAuth>
    </BrowserRouter>
    </ContextShare>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

