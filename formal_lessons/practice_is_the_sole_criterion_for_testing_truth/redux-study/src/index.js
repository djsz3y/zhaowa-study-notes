import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from './store'
import ReduxContext from './store/context'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ReduxContext.Provider value={store}>
    <App />
  </ReduxContext.Provider>
)
