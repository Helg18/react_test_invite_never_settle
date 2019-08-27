import React from 'react';
import logo from './logo.svg';
import './App.css';
import API from './services/axios';

function App() {
  API.getAll().then(data => {
    console.log(data);
      }
  );
  return (
    <div className="App">
      <header className="App-header">
        <img width="100vh" src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
