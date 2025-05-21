import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getIcon } from '../utils/iconUtils';
import { useAuth } from '../contexts/AuthContext';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { signup, loading } = useAuth();
  
  // Icons
  const ReceiptIcon = getIcon('receipt');
  const UserIcon = getIcon('user');
  const MailIcon = getIcon('mail');
  const LockIcon = getIcon('lock');
  const LoaderIcon = getIcon('loader-2');
  const CheckIcon = getIcon('check');
  
  const validate = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      signup(email, password, name);
    }
  };
  
  // Password strength indicator
  const getPasswordStrength = () => {
    if (!password) return { label: 'Weak', color: 'bg-red-500', width: '20%' };
    
    if (password.length < 8) {
      return { label: 'Weak', color: 'bg-red-500', width: '20%' };
    } else if (password.length >= 8 && password.length < 12) {
      return { label: 'Medium', color: 'bg-yellow-500', width: '50%' };
    } else {
      return { label: 'Strong', color: 'bg-green-500', width: '100%' };
    }
  };
  
  const strength = getPasswordStrength();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center py-12 px-4 bg-surface-50 dark:bg-surface-900"
    >
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center mb-6">
            <div className="bg-primary p-2 rounded-lg">
              <ReceiptIcon className="h-6 w-6 text-white" />
            </div>
            <h1 className="ml-2 text-2xl font-bold text-primary">DesignBill</h1>
          </Link>
          <h2 className="text-2xl font-bold text-surface-800 dark:text-white">Create an account</h2>
          <p className="mt-2 text-surface-600 dark:text-surface-400">
            Start managing your interior design business
          </p>
        </div>
        
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="form-label">Full Name</label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-surface-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`form-input pl-10 ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="Jane Smith"
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="form-label">Email Address</label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon className="h-5 w-5 text-surface-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`form-input pl-10 ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="password" className="form-label">Password</label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-surface-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`form-input pl-10 ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
              <div className="mt-2">
                <div className="bg-surface-200 dark:bg-surface-700 h-2 rounded-full overflow-hidden">
                  <div className={`h-full ${strength.color}`} style={{ width: strength.width }}></div>
                </div>
                <p className="text-xs mt-1 text-surface-500 dark:text-surface-400">Password strength: {strength.label}</p>
              </div>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`form-input ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="••••••••"
              />
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>
            
            <button type="submit" disabled={loading} className="btn btn-primary w-full flex justify-center items-center">
              {loading ? <LoaderIcon className="h-5 w-5 animate-spin mr-2" /> : <CheckIcon className="h-5 w-5 mr-2" />}
              Create Account
            </button>
          </form>
          
          <p className="mt-6 text-center text-sm text-surface-600 dark:text-surface-400">
            Already have an account? <Link to="/login" className="font-medium text-primary hover:text-primary-dark">Sign in</Link>
          </p>
          <p className="mt-4 text-center text-sm text-surface-600 dark:text-surface-400">
            <Link to="/" className="font-medium text-primary hover:text-primary-dark">Back to Homepage</Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Signup;