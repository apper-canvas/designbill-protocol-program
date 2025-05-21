import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getIcon } from '../utils/iconUtils';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

// Dashboard statistics component
const DashboardStats = () => {
  // Mock data for dashboard statistics
  const stats = [
    { 
      title: 'Total Revenue', 
      value: '$24,395.00', 
      change: '+14%',
      positive: true,
      icon: 'dollar'
    },
    { 
      title: 'Pending Invoices', 
      value: '12', 
      change: '+2',
      positive: false,
      icon: 'file-text'
    },
    { 
      title: 'Active Clients', 
      value: '28', 
      change: '+3',
      positive: true,
      icon: 'users'
    },
    { 
      title: 'Avg. Invoice Value', 
      value: '$1,854.00', 
      change: '+5%',
      positive: true,
      icon: 'trending-up'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = getIcon(stat.icon);
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="card flex items-center"
          >
            <div className={`p-3 rounded-lg ${stat.positive ? 'bg-primary-light/20' : 'bg-secondary-light/20'}`}>
              <Icon className={`w-6 h-6 ${stat.positive ? 'text-primary' : 'text-secondary'}`} />
            </div>
            <div className="ml-4">
              <h3 className="text-base font-medium text-surface-600 dark:text-surface-400">{stat.title}</h3>
              <div className="flex items-center">
                <span className="text-2xl font-semibold">{stat.value}</span>
                <span className={`ml-2 text-sm ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// Revenue chart component
const RevenueChart = () => {
  const [mounted, setMounted] = useState(false);
  const [chartOptions] = useState({
    chart: {
      type: 'area',
      toolbar: {
        show: false
      },
      fontFamily: 'Inter, ui-sans-serif, system-ui',
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.1,
      }
    },
    grid: {
      borderColor: '#e2e8f0',
      strokeDashArray: 5,
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      labels: {
        style: {
          colors: '#64748b',
        }
      }
    },
    yaxis: {
      labels: {
        formatter: function(value = 0) {
          return '$' + value.toLocaleString();
        },
        style: {
          colors: '#64748b',
        }
      }
    },
    tooltip: {
      theme: 'light',
      y: {
        formatter: function(value = 0) {
          return '$' + value.toLocaleString();
        }
      }
    },
    colors: ['#4A6FA5', '#F28C60']
  });

  const chartSeries = [{
    name: 'Revenue',
    data: [2100, 3200, 2800, 5100, 4300, 6200, 7800, 7100, 8400]
  }];
  
  // Set mounted state to true after component mounts
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <div className="card mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Revenue Trend</h3>
        <select className="form-input w-auto">
          <option>Last 9 Months</option>
          <option>This Year</option>
          <option>Last Year</option>
        </select>
      </div>
      {mounted && (
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="area"
          height={350}
        />
      )}
    </div>
  );
};

// Recent invoices component
const RecentInvoices = () => {
  // Mock data for recent invoices
  const invoices = [
    {
      id: 'INV-2023-001',
      client: 'Modern Living Spaces',
      amount: '$3,250.00',
      date: '2023-08-15',
      status: 'Paid'
    },
    {
      id: 'INV-2023-002',
      client: 'Greenfield Residence',
      amount: '$4,800.00',
      date: '2023-08-10',
      status: 'Pending'
    },
    {
      id: 'INV-2023-003',
      client: 'Urban Loft Designs',
      amount: '$2,150.00',
      date: '2023-08-05',
      status: 'Paid'
    },
    {
      id: 'INV-2023-004',
      client: 'Coastal Home Renovations',
      amount: '$5,975.00',
      date: '2023-07-28',
      status: 'Overdue'
    },
    {
      id: 'INV-2023-005',
      client: 'Elegant Interiors Co.',
      amount: '$1,850.00',
      date: '2023-07-20',
      status: 'Paid'
    }
  ];

  const viewInvoice = (id) => {
    toast.info(`Viewing invoice ${id}`);
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Recent Invoices</h3>
        <button className="btn btn-outline flex items-center text-sm">
          {getIcon('filter')({ className: "w-4 h-4 mr-1" })}
          Filter
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-surface-200 dark:border-surface-700">
              <th className="pb-3 font-medium text-surface-600 dark:text-surface-400">Invoice</th>
              <th className="pb-3 font-medium text-surface-600 dark:text-surface-400">Client</th>
              <th className="pb-3 font-medium text-surface-600 dark:text-surface-400">Amount</th>
              <th className="pb-3 font-medium text-surface-600 dark:text-surface-400">Date</th>
              <th className="pb-3 font-medium text-surface-600 dark:text-surface-400">Status</th>
              <th className="pb-3 font-medium text-surface-600 dark:text-surface-400">Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr key={index} className="border-b border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors">
                <td className="py-3 text-sm">{invoice.id}</td>
                <td className="py-3 text-sm">{invoice.client}</td>
                <td className="py-3 font-medium text-sm">{invoice.amount}</td>
                <td className="py-3 text-sm">{format(new Date(invoice.date), 'MMM d, yyyy')}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    invoice.status === 'Paid' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="py-3">
                  <button 
                    onClick={() => viewInvoice(invoice.id)}
                    className="text-primary hover:text-primary-dark text-sm font-medium transition-colors"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Main Dashboard component
const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <button className="btn btn-primary">Create New Invoice</button>
      </div>
      
      <div>
        {/* Dashboard content */}
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <button className="btn btn-primary">Create New Invoice</button>
        </div>
        
        <DashboardStats />
export default Dashboard;
        <RecentInvoices />
      </main>
    </div>
  );
};

export default Dashboard;