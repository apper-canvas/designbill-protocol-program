import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

const Home = () => {
  const [showRecent, setShowRecent] = useState(true);
  
  // Logo icons
  const ReceiptIcon = getIcon('receipt');
  const DollarSignIcon = getIcon('dollar-sign');
  const ChevronRightIcon = getIcon('chevron-right');
  const CheckCircleIcon = getIcon('check-circle');
  const ClipboardListIcon = getIcon('clipboard-list');
  const UsersIcon = getIcon('users');
  const BarChart4Icon = getIcon('bar-chart-4');
  const HeartIcon = getIcon('heart');
  
  const TwitterIcon = getIcon('twitter');
  const InstagramIcon = getIcon('instagram');
  const FacebookIcon = getIcon('facebook');
  // Recent invoices data (mock)
  const recentInvoices = [
    { id: 'INV-2023-001', client: 'Emma Johnson', project: 'Modern Living Room Redesign', amount: 2850, status: 'paid', date: '2023-10-15' },
    { id: 'INV-2023-002', client: 'Michael Chen', project: 'Kitchen Renovation Consultation', amount: 750, status: 'pending', date: '2023-10-28' },
    { id: 'INV-2023-003', client: 'Sophie Williams', project: 'Office Space Design', amount: 3200, status: 'overdue', date: '2023-09-30' },
  ];
  
  // Quick actions
  const quickActions = [
    { 
      title: 'New Invoice', 
      icon: 'file-plus', 
      color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
      action: () => toast.info("New invoice creation coming soon!") 
    },
    { 
      title: 'Add Client', 
      icon: 'user-plus', 
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
      action: () => toast.info("Client management coming soon!") 
    },
    { 
      title: 'Record Payment', 
      icon: 'credit-card', 
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
      action: () => toast.info("Payment recording coming soon!") 
    },
    { 
      title: 'Generate Report', 
      icon: 'bar-chart-2', 
      color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
      action: () => toast.info("Report generation coming soon!") 
    },
  ];
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen"
    >
      {/* Header */}
      <header className="bg-gradient-to-br from-primary to-primary-dark text-white py-6 md:py-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-white/20 p-2 rounded-lg">
                <ReceiptIcon className="h-6 w-6" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">DesignBill</h1>
            </div>
            <div className="flex items-center space-x-6">
              <a 
                href="/login" 
                className="text-white/90 hover:text-white font-medium transition-all"
              >
                  className="btn btn-outline text-surface-800 dark:text-surface-100 ml-4"
              </a>
              <a 
                href="/signup"
                className="bg-white text-primary-dark hover:bg-white/90 font-medium px-4 py-2 rounded-lg transition-all font-semibold"
              >
                Sign Up
              </a>
            </div>
          </div>
          
          <div className="mt-8 mb-4 max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Interior Design Invoicing Made Simple</h2>
            <p className="text-white/80 text-lg">Create professional invoices for your design projects, track payments, and manage clients all in one place.</p>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-4">
            <button 
              className="bg-white text-primary hover:bg-white/90 font-medium px-5 py-2.5 rounded-lg 
                        flex items-center transition-all shadow-lg shadow-primary-dark/20"
              onClick={() => toast.success("Welcome to DesignBill! Start by creating your first invoice.")}
            >
              Get Started 
              <ChevronRightIcon className="ml-2 h-5 w-5" />
            </button>
            
            <button 
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white 
                        font-medium px-5 py-2.5 rounded-lg flex items-center transition-all"
              onClick={() => document.getElementById('main-feature').scrollIntoView({ behavior: 'smooth' })}
            >
              Try Demo
            </button>
          </div>
        </div>
      </header>
      
      {/* Features overview */}
      <section className="py-12 bg-surface-50 dark:bg-surface-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Everything You Need for Interior Design Billing</h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div className="card" variants={item}>
              <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <ReceiptIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Professional Invoices</h3>
              <p className="text-surface-600 dark:text-surface-400">Create beautiful, branded invoices specific to interior design services and products.</p>
            </motion.div>
            
            <motion.div className="card" variants={item}>
              <div className="bg-secondary/10 dark:bg-secondary/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <ClipboardListIcon className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Service Catalog</h3>
              <p className="text-surface-600 dark:text-surface-400">Maintain a list of your services and products with customizable rates and descriptions.</p>
            </motion.div>
            
                className="btn btn-outline text-surface-800 dark:text-surface-100"
              <div className="bg-accent/10 dark:bg-accent/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                Login
              </Link> 
              <h3 className="text-xl font-semibold mb-2">Client Management</h3>
              <p className="text-surface-600 dark:text-surface-400">Keep track of clients, projects, and communication history all in one place.</p>
            </motion.div>
            
            <motion.div className="card" variants={item}>
              <div className="bg-green-500/10 dark:bg-green-500/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <DollarSignIcon className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Payment Tracking</h3>
              <p className="text-surface-600 dark:text-surface-400">Monitor payment status, send reminders, and record transactions easily.</p>
            </motion.div>
            
            <motion.div className="card" variants={item}>
              <div className="bg-purple-500/10 dark:bg-purple-500/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <BarChart4Icon className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Financial Insights</h3>
              <p className="text-surface-600 dark:text-surface-400">Get valuable insights about your business with visual reports and analytics.</p>
            </motion.div>
            
            <motion.div className="card" variants={item}>
              <div className="bg-pink-500/10 dark:bg-pink-500/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <HeartIcon className="h-6 w-6 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Designer-Focused</h3>
              <p className="text-surface-600 dark:text-surface-400">Built specifically for interior designers with your unique workflow in mind.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Dashboard Preview */}
      <section id="main-feature" className="py-12 bg-surface-100 dark:bg-surface-800/50">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Your Design Business at a Glance</h2>
            <p className="text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
              Try the invoice creator below and see how DesignBill can streamline your billing process.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Dashboard sidebar */}
            <div className="w-full lg:w-64 flex-shrink-0 space-y-6">
              <div className="neu-card">
                <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  {quickActions.map((action, index) => {
                    const ActionIcon = getIcon(action.icon);
                    return (
                      <button 
                        key={index}
                        className="w-full flex items-center p-3 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-700 transition-all"
                        onClick={action.action}
                      >
                        <div className={`w-9 h-9 flex items-center justify-center rounded-lg mr-3 ${action.color}`}>
                          <ActionIcon className="h-5 w-5" />
                        </div>
                        <span className="font-medium">{action.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              
              <div className="neu-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Statistics</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-surface-500 dark:text-surface-400">Outstanding</span>
                    <span className="font-semibold">$4,750.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-surface-500 dark:text-surface-400">Paid this month</span>
                    <span className="font-semibold">$3,200.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-surface-500 dark:text-surface-400">Active projects</span>
                    <span className="font-semibold">5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-surface-500 dark:text-surface-400">Clients</span>
                    <span className="font-semibold">12</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main content */}
            <div className="flex-1">
              <div className="neu-card">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold mb-2 sm:mb-0">Create an Invoice</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setShowRecent(!showRecent)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                                ${showRecent 
                                ? 'bg-primary/10 text-primary dark:bg-primary/20' 
                                : 'bg-surface-200 text-surface-600 dark:bg-surface-700 dark:text-surface-400'}`}
                    >
                      Recent Invoices
                    </button>
                  </div>
                </div>
                
                {showRecent && (
                  <div className="mb-8 overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-surface-200 dark:border-surface-700">
                          <th className="text-left py-3 px-2 text-surface-500 dark:text-surface-400 font-medium">Invoice</th>
                          <th className="text-left py-3 px-2 text-surface-500 dark:text-surface-400 font-medium">Client</th>
                          <th className="text-left py-3 px-2 text-surface-500 dark:text-surface-400 font-medium hidden md:table-cell">Project</th>
                          <th className="text-right py-3 px-2 text-surface-500 dark:text-surface-400 font-medium">Amount</th>
                          <th className="text-right py-3 px-2 text-surface-500 dark:text-surface-400 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentInvoices.map((invoice) => (
                          <tr key={invoice.id} className="border-b border-surface-200 dark:border-surface-700 last:border-0">
                            <td className="py-3 px-2 font-medium">{invoice.id}</td>
                            <td className="py-3 px-2">{invoice.client}</td>
                            <td className="py-3 px-2 hidden md:table-cell">{invoice.project}</td>
                            <td className="py-3 px-2 text-right font-medium">${invoice.amount.toLocaleString()}</td>
                            <td className="py-3 px-2">
                              <div className="flex justify-end">
                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium 
                                                ${invoice.status === 'paid' 
                                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                                                : invoice.status === 'pending'
                                                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                
                <MainFeature />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-surface-800 dark:bg-surface-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-white/10 p-2 rounded-lg">
                <ReceiptIcon className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">DesignBill</span>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-white/70 hover:text-white transition-colors">Features</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">Pricing</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">Support</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/50 text-sm mb-4 md:mb-0">© 2023 DesignBill. All rights reserved.</p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-white/50 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <TwitterIcon className="h-5 w-5" />                
              </a>
              <a href="#" className="text-white/50 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/50 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <FacebookIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default Home;