import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Antri from './pages/Antri';
import Navbar from './components/template/Navbar';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import Kasir from './pages/Kasir';
import Manager from './pages/Manager';

function App() {

  return (
    <Router>
      <div className='relative'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/antri" element={<Antri />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/pemilik" element={<Manager />} />
          <Route path="/kasir" element={<Kasir />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
