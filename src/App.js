import React from 'react';
import AppRoutes from './routes';
import { UserProvider } from './auth/UserContext';

function App() {
  return (
    <div className="bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]" style={{ minHeight: '100vh' }}>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </div>
  );
}

export default App;
