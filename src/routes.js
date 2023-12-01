import React from 'react';
import Home from './pages/Home';
import { auth } from './auth/firebase';
import NotFound from './pages/NotFound';
import LoginScreen from './pages/LoginScreen';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = !!auth.currentUser;

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
