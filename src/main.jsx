import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TripProvider } from './context/TripContext.jsx'

createRoot(document.getElementById('root')).render(

    <TripProvider>
    <App />
    </TripProvider>
  ,
)
