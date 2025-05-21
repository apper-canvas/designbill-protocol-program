import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getIcon } from '../utils/iconUtils';
import Sidebar from './Sidebar';

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { currentUser, logout } = useAuth();
  const MenuIcon = getIcon('menu');
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-surface-100 dark:bg-surface-900 flex">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
        <header className="bg-white dark:bg-surface-800 shadow-sm border-b border-surface-200 dark:border-surface-700">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <button onClick={toggleSidebar} className="md:hidden p-2 rounded-md">
              <MenuIcon className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-bold text-primary dark:text-primary-light hidden md:block">DesignBill</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Welcome, {currentUser?.name || 'User'}</span>
              <button onClick={logout} className="btn btn-outline text-sm py-1">Logout</button>
            </div>
          </div>
        </header>
        
        <main className="px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;