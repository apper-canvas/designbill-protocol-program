import { Link, useLocation } from 'react-router-dom';
import { getIcon } from '../utils/iconUtils';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  
  // Icons
  const ReceiptIcon = getIcon('receipt');
  const HomeIcon = getIcon('home');
  const FileTextIcon = getIcon('file-text');
  const UsersIcon = getIcon('users');
  const CreditCardIcon = getIcon('credit-card');
  const SettingsIcon = getIcon('settings');
  const XIcon = getIcon('x');
  
  const navigationItems = [
    {
      name: 'Dashboard',
      icon: HomeIcon,
      path: '/dashboard',
    },
    {
      name: 'Invoices',
      icon: FileTextIcon,
      path: '/invoices',
    },
    {
      name: 'Clients',
      icon: UsersIcon,
      path: '/clients',
    },
    {
      name: 'Payments',
      icon: CreditCardIcon,
      path: '/payments',
    },
    {
      name: 'Settings',
      icon: SettingsIcon,
      path: '/settings',
    },
  ];

  // Sidebar animation variants
  const sidebarVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: '-100%',
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  };

  // Nav item animation variants
  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    },
    closed: {
      opacity: 0,
      y: 20,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <AnimatePresence>
        <motion.aside
          variants={sidebarVariants}
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
          className={`fixed top-0 left-0 z-20 h-full w-64 bg-white dark:bg-surface-800 border-r border-surface-200 dark:border-surface-700 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        >
          <div className="p-4 flex items-center justify-between border-b border-surface-200 dark:border-surface-700">
            <Link to="/dashboard" className="flex items-center">
              <div className="bg-primary p-2 rounded-lg">
                <ReceiptIcon className="h-6 w-6 text-white" />
              </div>
              <h1 className="ml-2 text-xl font-bold text-primary">DesignBill</h1>
            </Link>
            <button onClick={toggleSidebar} className="p-1 rounded-md md:hidden">
              <XIcon className="h-5 w-5" />
            </button>
          </div>
          
          <nav className="mt-6 px-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? 'bg-primary text-white'
                        : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                    }`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </motion.aside>
      </AnimatePresence>
    </>
  );
};

export default Sidebar;