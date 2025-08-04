import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('weatherAppToken'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('weatherAppToken');
  }, []);

  const fetchUserProfile = useCallback(async (currentToken) => {
    if (!currentToken) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get(`${API_BASE}/user/profile`, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch profile. Logging out.", err);
      logout();
    } finally {
      setLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    fetchUserProfile(token);
  }, [token, fetchUserProfile]);

  const login = async (email, password) => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
      if (res.data && res.data.token) {
        setToken(res.data.token);
        localStorage.setItem('weatherAppToken', res.data.token);
        return { success: true };
      }
      return { success: false, message: 'Login failed.' };
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, email, password) => {
    try {
      const res = await axios.post(`${API_BASE}/auth/register`, { username, email, password });
      return { success: true, message: res.data.message };
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed.';
      return { success: false, message };
    }
  };

  const value = {
    token,
    user,
    isAuthenticated: !!token,
    loading,
    error,
    login,
    register,
    logout,
    setError,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Do not block rendering here; App.js can handle loading */}
      {children}
    </AuthContext.Provider>
  );
};
