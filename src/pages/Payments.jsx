import { useState } from 'react';
import { getIcon } from '../utils/iconUtils';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const Payments = () => {
  // Mock data for payments
  const [payments, setPayments] = useState([
    {
      id: 'PMT-2023-001',
      client: 'Modern Living Spaces',
      amount: '$3,250.00',
      date: '2023-08-15',
      method: 'Credit Card',
      status: 'Completed',
      invoice: 'INV-2023-001'
    },
    {
      id: 'PMT-2023-002',
      client: 'Urban Loft Designs',
      amount: '$2,150.00',
      date: '2023-08-05',
      method: 'Bank Transfer',
      status: 'Completed',
      invoice: 'INV-2023-003'
    },
    {
      id: 'PMT-2023-003',
      client: 'Elegant Interiors Co.',
      amount: '$1,850.00',
      date: '2023-07-20',
      method: 'PayPal',
      status: 'Completed',
      invoice: 'INV-2023-005'
    },
    {
      id: 'PMT-2023-004',
      client: 'Greenfield Residence',
      amount: '$2,400.00',
      date: '2023-07-12',
      method: 'Credit Card',
      status: 'Completed',
      invoice: 'INV-2023-002'
    },
    {
      id: 'PMT-2023-005',
      client: 'Urban Paradise Gardens',
      amount: '$1,375.00',
      date: '2023-07-10',
      method: 'Bank Transfer',
      status: 'Pending',
      invoice: 'INV-2023-007'
    }
  ]);

  // Get icons
  const PlusIcon = getIcon('plus');
  const SearchIcon = getIcon('search');
  const DollarSignIcon = getIcon('dollar-sign');

  const viewPayment = (id) => {
    toast.info(`Viewing payment ${id}`);
  };

  const recordPayment = () => {
    toast.info('Opening payment form');
  };

  const deletePayment = (id) => {
    if (confirm('Are you sure you want to delete this payment record?')) {
      setPayments(payments.filter(payment => payment.id !== id));
      toast.success(`Payment ${id} deleted successfully`);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold">Payments</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-surface-400" />
            </div>
            <input
              type="text"
              placeholder="Search payments..."
              className="form-input pl-10"
            />
          </div>
          <button onClick={recordPayment} className="btn btn-primary flex items-center">
            <DollarSignIcon className="w-5 h-5 mr-2" />
            Record Payment
          </button>
        </div>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-surface-200 dark:border-surface-700">
                <th className="pb-3 font-medium text-surface-600 dark:text-surface-400">Payment ID</th>
                <th className="pb-3 font-medium text-surface-600 dark:text-surface-400">Client</th>
                <th className="pb-3 font-medium text-surface-600 dark:text-surface-400">Amount</th>
                <th className="pb-3 font-medium text-surface-600 dark:text-surface-400">Date</th>
                <th className="pb-3 font-medium text-surface-600 dark:text-surface-400">Method</th>
                <th className="pb-3 font-medium text-surface-600 dark:text-surface-400">Status</th>
                <th className="pb-3 font-medium text-surface-600 dark:text-surface-400">Invoice</th>
                <th className="pb-3 font-medium text-surface-600 dark:text-surface-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={index} className="border-b border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors">
                  <td className="py-3 text-sm">{payment.id}</td>
                  <td className="py-3 text-sm">{payment.client}</td>
                  <td className="py-3 font-medium text-sm">{payment.amount}</td>
                  <td className="py-3 text-sm">{format(new Date(payment.date), 'MMM d, yyyy')}</td>
                  <td className="py-3 text-sm">{payment.method}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      payment.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-3 text-sm">{payment.invoice}</td>
                  <td className="py-3">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => viewPayment(payment.id)}
                        className="text-primary hover:text-primary-dark text-sm font-medium transition-colors"
                      >
                        View
                      </button>
                      <button 
                        onClick={() => deletePayment(payment.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Payments;