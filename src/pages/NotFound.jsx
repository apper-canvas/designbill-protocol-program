import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getIcon } from '../utils/iconUtils';

const NotFound = () => {
  const HomeIcon = getIcon('home');
  const AlertCircleIcon = getIcon('alert-circle');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="max-w-md w-full text-center">
        <div className="mx-auto w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
          <AlertCircleIcon className="h-12 w-12 text-red-600 dark:text-red-400" />
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-surface-800 dark:text-white">404</h1>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-surface-700 dark:text-surface-200">Page Not Found</h2>
        
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link
          to="/"
          className="inline-flex items-center justify-center px-5 py-3 bg-primary hover:bg-primary-dark text-white 
                   rounded-lg transition-colors shadow-lg shadow-primary/20"
        >
          <HomeIcon className="mr-2 h-5 w-5" />
          Return Home
        </Link>
      </div>
    </motion.div>
  );
};

export default NotFound;