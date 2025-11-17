import React from 'react'
// import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import Page from './pages/Payment.tsx'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// import AuthCard from './pages/AuthCard.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)


