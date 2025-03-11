import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Onboarding from './pages/onboarding/Onboarding';
import { AuthProvider } from './context/Authcontext';
import ProtectedRoute from './utils/protectedRoute';

const App = () => {
  return (
  <AuthProvider>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
              <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
        } />
      </Routes>
  </AuthProvider>
  )
}
export default App;
