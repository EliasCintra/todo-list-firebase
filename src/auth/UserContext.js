import { useState, createContext, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}; 

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error('useUser deve ser usado dentro de um UserProvider');
    }
    return context;
};
