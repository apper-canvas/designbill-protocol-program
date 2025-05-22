import { useState, useEffect } from 'react';
import { getIcon } from '../utils/iconUtils';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { getInvoices } from '../services/InvoiceService';

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  // Load invoices from the database
  useEffect(() => {
    fetchInvoices();
  }, [filter]);

  // Fetch invoices with optional filter
  const fetchInvoices = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Prepare filter object
      const filters = {};
      if (filter !== 'all') {
        filters.status = filter.charAt(0).toUpperCase() + filter.slice(1);
      }
      if (searchTerm) {
        filters.search = searchTerm;
      }
      
      const response = await getInvoices(filters);
      
      if (response.success) {
        // Format invoices to match the expected structure in the UI
        const formattedInvoices = response.data.map(invoice => ({
          id: invoice.Id,
          invoiceNumber: invoice.invoiceNumber,
          client: { 
            id: invoice.client,
            name: invoice.client_Name || 'Unknown Client'
          },
          calculatedTotals: { 
            total: parseFloat(invoice.total || 0) 
          },
          date: invoice.issueDate,
          status: invoice.status || 'Pending'
        }));
        
        setInvoices(formattedInvoices);
      } else {
        throw new Error(response.error);
      }
    } catch (err) {
      console.error('Failed to fetch invoices:', err);
      setError(err.message || 'Failed to load invoices');
      toast.error('Failed to load invoices');
      
      // Fallback to localStorage data if API fails
      const savedInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
      if (savedInvoices.length > 0) {
        setInvoices(savedInvoices);
      }
    } finally {
      setLoading(false);
    }
  };

  // Get icons
  const PlusIcon = getIcon('plus');
  const SearchIcon = getIcon('search');
  const RefreshIcon = getIcon('refresh');

  // Filter invoices by status
  const filteredInvoices = filter === 'all' 
    ? invoices
    : invoices.filter(invoice => 
        (invoice.status || 'Pending').toLowerCase() === filter.toLowerCase()
      );

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    fetchInvoices();
  };

  const viewInvoice = (id) => {
    // Navigate to the view invoice page
    navigate(`/invoices/${id}`);
  };

  const deleteInvoice = async (id) => {
    if (confirm('Are you sure you want to delete this invoice?')) {
      try {
        // In a real implementation, this would call the API to delete the invoice
        setInvoices(invoices.filter(invoice => invoice.invoiceNumber !== id));
        toast.success(`Invoice ${id} deleted successfully`);
      } catch (err) {
        toast.error('Failed to delete invoice');
      }
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold">Invoices</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <form onSubmit={handleSearch}>
              <div className="flex">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-surface-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search invoices..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="form-input pl-10"
                  />
                </div>
                <button type="submit" className="btn btn-outline ml-2">
                  Search
                </button>
              </div>
            </form>
          </div>
          <button className="btn btn-primary flex items-center" onClick={() => navigate('/invoices/create')}>
            <PlusIcon className="w-5 h-5 mr-2" />
            New Invoice
          </button>
          <button className="btn btn-outline" onClick={fetchInvoices}>
            <RefreshIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="card relative">
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

        {/* Loading and error states */}
        {loading && (
          <div className="absolute inset-0 bg-white/50 dark:bg-black/50 flex justify-center items-center z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 p-4 mb-4 rounded-lg">
            <p className="text-red-700 dark:text-red-400">{error}</p>
            <button 
              onClick={fetchInvoices} 
              className="mt-2 text-sm text-red-700 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
            >Retry</button>
          </div>
        )}

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
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((invoice, index) => (
                <tr key={invoice.id || index} className="border-b border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors">
                  <td className="py-3 text-sm">{invoice.invoiceNumber}</td>
                  <td className="py-3 text-sm">{invoice.client?.name || 'Unknown Client'}</td>
                  <td className="py-3 font-medium text-sm">
                    ${(invoice.calculatedTotals?.total || 0).toFixed(2)}
                  </td>
                  <td className="py-3 text-sm">
                    {invoice.date ? 
                      // Safely format the date, handling potential invalid dates
                      (() => {
                        try {
                          return format(new Date(invoice.date), 'MMM d, yyyy');
                        } catch (e) {
                          return invoice.date || '-';
                        }
                      })() 
                      : '-'}
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      (invoice.status || 'Pending') === 'Paid' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      (invoice.status || 'Pending') === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => viewInvoice(invoice.invoiceNumber)}
                        className="text-primary hover:text-primary-dark text-sm font-medium transition-colors"
                      >
                        View
                      </button>
                      <button 
                        onClick={() => deleteInvoice(invoice.invoiceNumber)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors ml-2"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-8 text-center text-surface-500 dark:text-surface-400">
                  <p className="text-lg">No invoices found</p>
                  <p className="text-sm mt-1">Create your first invoice or adjust your search filters</p>
                </td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Invoices;