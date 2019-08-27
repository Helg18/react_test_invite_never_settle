import React from 'react';
import './App.css';
import API from './services/axios';

// App Partials
import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import Footer from "./components/Footer/Footer";

function App() {
  API.getAll().then(data => {
    console.log(data);
      }
  );
  return (
    <div className="App">
        <Header />
        <Body />
        <Footer />
     </div>
  );
}

export default App;
