import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import { AuthProvider } from '../src/context/authContext.jsx';

function App() {

  return (
    <Router>
      <AuthProvider>
        <NavBar />
      </AuthProvider>
    </Router>
  );
}

export default App;
