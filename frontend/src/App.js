import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const AppWrapper = () => {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<Register navigate={navigate} />} />
      <Route path="/register" element={<Register navigate={navigate} />} />
      <Route path="/login" element={<Login navigate={navigate} />} />
      <Route path="/dashboard" element={<Dashboard navigate={navigate} />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
