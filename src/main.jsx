import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { wedding } from './config'

// Colour theme from config ('classic' or 'sage'), applied before the first paint
document.documentElement.dataset.theme = wedding.theme || 'classic'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
