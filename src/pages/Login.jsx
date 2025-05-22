import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
function Login() {
  const navigate = useNavigate();
  const { isInitialized } = useAuth();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect');
  
  useEffect(() => {
    if (isInitialized) {
      // Show login UI in this component
      const { ApperUI } = window.ApperSDK;
      ApperUI.showLogin("#authentication");
    }
  }, [isInitialized]);
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
    <div className="flex min-h-screen items-center justify-center bg-surface-50 dark:bg-surface-900">
      <div className="w-full max-w-md space-y-8 p-6 bg-white dark:bg-surface-800 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-surface-800 dark:text-surface-100">Welcome Back</h1>
          <p className="mt-2 text-surface-600 dark:text-surface-400">Sign in to your account</p>
        </div>
        <div id="authentication" className="min-h-[400px]" />
        <div className="text-center mt-4">
          <p className="text-sm text-surface-600 dark:text-surface-400">
            Don't have an account?{' '}
            <Link 
              to={redirectPath ? `/signup?redirect=${redirectPath}` : "/signup"} 
              className="font-medium text-primary hover:text-primary-dark"
            >
              Sign up
            </Link>
          </p>
        </div>
  return (
    <motion.div
      initial={{ opacity: 0 }}
}
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
          <h2 className="text-2xl font-bold text-surface-800 dark:text-white">Welcome back</h2>
          <p className="mt-2 text-surface-600 dark:text-surface-400">
            Sign in to your account to continue
          </p>
        </div>
        
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
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
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-surface-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`form-input pl-10 ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary-light border-surface-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-surface-700 dark:text-surface-300">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm font-medium text-primary hover:text-primary-dark" onClick={() => toast.info("Password reset functionality coming soon!")}>
                Forgot your password?
              </a>
            </div>
            
            <button type="submit" disabled={loading} className="btn btn-primary w-full flex justify-center items-center">
              {loading ? <LoaderIcon className="h-5 w-5 animate-spin mr-2" /> : <ArrowRightIcon className="h-5 w-5 mr-2" />}
              Sign in
            </button>
          </form>
          
          <p className="mt-6 text-center text-sm text-surface-600 dark:text-surface-400">
            Don't have an account? <Link to="/signup" className="font-medium text-primary hover:text-primary-dark">Sign up</Link>
          </p>
          <p className="mt-4 text-center text-sm text-surface-600 dark:text-surface-400">
            <Link to="/" className="font-medium text-primary hover:text-primary-dark">Back to Homepage</Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;