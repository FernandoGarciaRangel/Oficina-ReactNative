import React, { createContext, useContext, useState } from 'react';
import { authService } from '../services/firebaseService';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // { uid, email, funcao }

  const logout = async () => {
    try {
      await authService.logoutUser();
      setUser(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
} 