import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

console.log('CLIENT ENVIRONMENT: ', process.env.NODE_ENV)

//if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
//}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
