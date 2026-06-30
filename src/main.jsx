import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init({ once: true, duration: 700, easing: 'ease-out', offset: 120 })
window.addEventListener('load', () => setTimeout(() => AOS.refreshHard(), 300))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
