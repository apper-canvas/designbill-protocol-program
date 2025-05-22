import { useContext } from 'react';
import { AuthContext } from '../App';
import { useSelector } from 'react-redux';

/**
 * Custom hook to use auth context.
 * This is a wrapper around the AuthContext from App.jsx.
 * It extends the base context with Redux user state.
 */
export function useAuth() {
  const authContext = useContext(AuthContext);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  
  return {
    ...authContext,
    currentUser: user,
    isAuthenticated,
  };
}