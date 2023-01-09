import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;