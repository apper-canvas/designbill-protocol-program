import { motion } from 'framer-motion';
import { getIcon } from '../utils/iconUtils';

const DashboardStats = ({ stats }) => {
  if (!stats || stats.length === 0) {
    // Default stats if none are provided
    stats = [
      { 
        title: 'Total Revenue', 
        value: '$0.00', 
        change: '0%',
        positive: true,
        icon: 'dollar'
      },
      { 
        title: 'Pending Invoices', 
        value: '0', 
        change: '0',
        positive: true,
        icon: 'file-text'
      }
    ];
  }

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

export default DashboardStats;