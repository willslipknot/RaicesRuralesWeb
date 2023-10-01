import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar.jsx';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCheckboxChange = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (

    <div className="App">
    <NavBar isMenuOpen={isMenuOpen} onCheckboxChange={handleCheckboxChange} />
 
    </div>
    


  );
}

export default App

