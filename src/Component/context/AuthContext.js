// AuthContext.js
import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    userData: null,
  });

  const setToken = (token) => {
    setAuthState((prevState) => ({
      ...prevState,
      token,
    }));
    localStorage.setItem('token', token);
  };

  const setUserData = (userData) => {
    setAuthState((prevState) => ({
      ...prevState,
      userData,
    }));
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  return (
    <AuthContext.Provider value={{ authState, setToken, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
