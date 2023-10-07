import React, { useState } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../src/context/authContext.jsx';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import Actividades from './pages/Actividades.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import { ActProvider } from './context/actContext.jsx';
import HomeUser from './pages/HomeUser.jsx';
import NavBar from './components/Home/NavBar.jsx';
import ActCard from './components/UserLog/ActCard.jsx';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ActProvider>
          <NavBar></NavBar>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route element={<ProtectedRoute />}>

              <Route path='/HomeUser' element={<HomeUser />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Actividades" element={<Actividades />} />



            </Route>
          </Routes>
        </ActProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;