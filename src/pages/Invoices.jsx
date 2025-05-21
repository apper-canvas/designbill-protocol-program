import { useState } from 'react';
import { getIcon } from '../utils/iconUtils';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const Invoices = () => {
  // Mock data for invoices
  const [invoices, setInvoices] = useState([
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
    },
    {
      id: 'INV-2023-006',
      client: 'Artisan Home Builders',
      amount: '$7,400.00',
      date: '2023-07-15',
      status: 'Pending'
    },
    {
      id: 'INV-2023-007',
      client: 'Urban Paradise Gardens',
      amount: '$2,750.00',
      date: '2023-07-10',
      status: 'Paid'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  // Get icons
  const PlusIcon = getIcon('plus');
  const SearchIcon = getIcon('search');
  const FilterIcon = getIcon('filter');

  // Filter invoices by status
  const filteredInvoices = filter === 'all' 
    ? invoices 
    : invoices.filter(invoice => invoice.status.toLowerCase() === filter.toLowerCase());

  const viewInvoice = (id) => {
    toast.info(`Viewing invoice ${id}`);
  };

  const deleteInvoice = (id) => {
    if (confirm('Are you sure you want to delete this invoice?')) {
      setInvoices(invoices.filter(invoice => invoice.id !== id));
      toast.success(`Invoice ${id} deleted successfully`);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold">Invoices</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-surface-400" />
            </div>
            <input
              type="text"
              placeholder="Search invoices..."
              className="form-input pl-10"
            />
          </div>
          <button className="btn btn-primary flex items-center" onClick={() => navigate('/create-invoice')}>
            <PlusIcon className="w-5 h-5 mr-2" />
            New Invoice
          </button>
        </div>
      </div>

      <div className="card">
        <div className="flex flex-wrap gap-3 mb-6">
          <button 
            onClick={() => setFilter('all')}
            className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline'}`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('paid')}
            className={`btn ${filter === 'paid' ? 'btn-primary' : 'btn-outline'}`}
          >
            Paid
          </button>
          <button 
            onClick={() => setFilter('pending')}
            className={`btn ${filter === 'pending' ? 'btn-primary' : 'btn-outline'}`}
          >
            Pending
          </button>
          <button 
            onClick={() => setFilter('overdue')}
            className={`btn ${filter === 'overdue' ? 'btn-primary' : 'btn-outline'}`}
          >
            Overdue
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
                <th className="pb-3 font-medium text-surface-600 dark:text-surface-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice, index) => (
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
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => viewInvoice(invoice.id)}
                        className="text-primary hover:text-primary-dark text-sm font-medium transition-colors"
                      >
                        View
                      </button>
                      <button 
                        onClick={() => deleteInvoice(invoice.id)}
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

export default Invoices;