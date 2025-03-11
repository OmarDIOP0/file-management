import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Onboarding from './pages/onboarding/Onboarding';
import { AuthProvider } from './context/Authcontext';

const App = () => {
  return (
  <AuthProvider>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
  </AuthProvider>
  )
}
export default App;
