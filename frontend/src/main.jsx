
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PageBlocker from './components/PageBlocker.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PageBlocker>
      <App />
    </PageBlocker>
  </StrictMode>,
)
