import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element= {<SignIn />} />
        <Route path="/register" element= {<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;