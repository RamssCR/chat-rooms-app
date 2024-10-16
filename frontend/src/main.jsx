import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { MessageContext } from './context/MessageContext'
import './styles/css/main.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MessageContext>
      <App />
    </MessageContext>
  </React.StrictMode>,
)
