import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./components/styles/index.css"
import { BrowserRouter } from 'react-router-dom'
import GlobContext from './contexts/GlobContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GlobContext>
      <App />
    </GlobContext>
  </BrowserRouter>,
)
