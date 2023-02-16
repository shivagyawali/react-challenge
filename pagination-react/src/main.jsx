import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import toast, { Toaster } from "react-hot-toast";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster position="top-right" reverseOrder={false} />
    <App />
  </React.StrictMode>
);
