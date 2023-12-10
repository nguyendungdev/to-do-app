import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import en from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/build/esm/styles.css";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
