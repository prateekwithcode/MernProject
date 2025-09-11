// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Optional: Import global styles
import App from './App'; // Import the main App component

// Create a root instance to render the application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);