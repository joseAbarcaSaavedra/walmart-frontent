import 'dotenv/config'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { GlobalState } from 'context/GlobalState'
import App from './App'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <GlobalState>
    <App />
  </GlobalState>,
  document.getElementById('root')
)

// TODO - add strict mode, fix dep with material ui
reportWebVitals()
