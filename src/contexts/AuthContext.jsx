import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Create auth context
const AuthContext = createContext();

// Custom hook to use auth context
export function useAuth() {
  return useContext(AuthContext);
}

// Auth provider component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is already logged in on mount
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Sign up function
  const signup = (email, password, name) => {
    // This would normally make an API call
    // For now we'll simulate a successful signup
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newUser = { id: Date.now().toString(), name, email };
      setCurrentUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(newUser));
      setLoading(false);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    }, 1000);
  };

  // Login function
  const login = (email, password) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const user = { id: Date.now().toString(), name: 'Demo User', email };
      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(user));
      setLoading(false);
      toast.success('Logged in successfully!');
      navigate('/dashboard');
    }, 1000);
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    toast.info('You have been logged out');
    navigate('/');
  };

  return <AuthContext.Provider value={{ currentUser, isAuthenticated, loading, signup, login, logout }}>{children}</AuthContext.Provider>;
}