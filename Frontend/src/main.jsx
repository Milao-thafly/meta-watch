import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import {AuthContextProvider} from './core/auth/useAuthContext.js'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
  </StrictMode>,
)
