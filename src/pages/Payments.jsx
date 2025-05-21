import React, { useState } from 'react';
import { getIcon } from '../utils/iconUtils';
import { calculatePaymentStats, getPaymentStatusLabel, getPaymentStatusColorClass } from '../utils/paymentService';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const Payments = () => {
  // Mock data for payments
  const [payments, setPayments] = useState([
    {
      id: 'PMT-2023-001',
      client: 'Modern Living Spaces',
      amount: '$2,800.00',
      date: '2023-08-15',
      method: 'Credit Card',
      status: 'Completed',
      invoice: 'INV-2023-001',
      invoiceTotal: 7000.00,
      isUpfront: true,
      notes: 'Upfront payment for kitchen redesign'
    },
    {
      id: 'PMT-2023-002',
      client: 'Modern Living Spaces',
      amount: '$4,200.00',
      date: '2023-08-05',
      method: 'Bank Transfer',
      status: 'Completed',
      invoice: 'INV-2023-001',
      invoiceTotal: 7000.00,
      isUpfront: false,
      notes: 'Final payment upon completion'
    },
    {
      id: 'PMT-2023-003',
      client: 'Urban Loft Designs',
      amount: '$2,150.00',
      date: '2023-07-28',
      method: 'Bank Transfer',
      status: 'Completed',
      invoice: 'INV-2023-003',
      invoiceTotal: 5375.00,
      isUpfront: true,
      notes: 'Upfront payment (40%)'
    },
    {
      id: 'PMT-2023-004',
      client: 'Elegant Interiors Co.',
      amount: '$1,950.00',
      date: '2023-07-20',
      method: 'PayPal',
      status: 'Completed',
      invoice: 'INV-2023-005',
      invoiceTotal: 4875.00,
      isUpfront: true,
      notes: 'Upfront payment for office renovation'
    },
    {
      id: 'PMT-2023-005',
      client: 'Greenfield Residence',
      amount: '$2,200.00',
      date: '2023-07-12',
      method: 'Credit Card',
      status: 'Completed',
      invoice: 'INV-2023-002',
      invoiceTotal: 5500.00,
      isUpfront: true,
      notes: 'Initial 40% payment'
    },
    {
      id: 'PMT-2023-006',
      client: 'Urban Paradise Gardens',
      amount: '$2,300.00',
      date: '2023-07-10',
      method: 'Bank Transfer',
      status: 'Completed',
      invoice: 'INV-2023-007',
      invoiceTotal: 5750.00,
      isUpfront: true,
      notes: '40% upfront for outdoor space design'
    }
  ]);
  
  // Group payments by invoice for easy reference
  const [invoicePayments, setInvoicePayments] = useState(() => {
    const grouped = {};
    payments.forEach(payment => {
      if (!grouped[payment.invoice]) {
        grouped[payment.invoice] = {
          invoiceId: payment.invoice,
          clientName: payment.client,
          total: payment.invoiceTotal,
          payments: []
        };
      }
      grouped[payment.invoice].payments.push(payment);
    });
    return grouped;
  });
  
  // State for filters
  const [filters, setFilters] = useState({
    search: '',
    paymentStatus: 'all', // all, fully-paid, partially-paid, unpaid
    date: {
      from: '',
      to: ''
    }
  });
  
  // State for the currently viewed invoice payments
  const [selectedInvoice, setSelectedInvoice] = useState({
    invoiceId: null,
    showDetails: false
  });
  

  // Get icons
  const PlusIcon = getIcon('plus');
  const SearchIcon = getIcon('search');
  const DollarSignIcon = getIcon('dollar-sign');

  const FilterIcon = getIcon('filter');
  const ChevronDownIcon = getIcon('chevron-down');
  const ChevronUpIcon = getIcon('chevron-up');
  const CalendarIcon = getIcon('calendar');
  
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFilters(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  // Toggle invoice payment details
  const toggleInvoiceDetails = (invoiceId) => {
    setSelectedInvoice(prev => ({
      invoiceId: prev.invoiceId === invoiceId && prev.showDetails ? null : invoiceId,
      showDetails: prev.invoiceId !== invoiceId || !prev.showDetails
    }));
  };
  
  // Record a new payment
  const recordPayment = () => {
    toast.info('Opening payment form');
    // Logic to open payment modal would go here
  };
  
  // Delete a payment
  const deletePayment = (id) => {
    if (confirm('Are you sure you want to delete this payment record?')) {
      setPayments(payments.filter(payment => payment.id !== id));
      
      // Update the grouped payments
      const updatedGrouped = { ...invoicePayments };
      Object.keys(updatedGrouped).forEach(invoiceId => {
        updatedGrouped[invoiceId].payments = updatedGrouped[invoiceId].payments.filter(
          payment => payment.id !== id
        );
      });
      setInvoicePayments(updatedGrouped);
      
      toast.success(`Payment ${id} deleted successfully`);
    }
  };

  // Process and filter payments for display
  const processedInvoices = Object.values(invoicePayments)
    .map(invoice => {
      const stats = calculatePaymentStats(invoice.total, invoice.payments);
      return {
        ...invoice,
        stats
      };
    })
    .filter(invoice => {
      // Apply search filter
      if (filters.search && 
          !invoice.invoiceId.toLowerCase().includes(filters.search.toLowerCase()) &&
          !invoice.clientName.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      // Apply payment status filter
      if (filters.paymentStatus !== 'all') {
        if (filters.paymentStatus === 'fully-paid' && !invoice.stats.isPaid) return false;
        if (filters.paymentStatus === 'partially-paid' && 
            (!invoice.stats.isPartiallyPaid || invoice.stats.isPaid)) return false;
        if (filters.paymentStatus === 'unpaid' && 
            (invoice.stats.paidAmount > 0)) return false;
        if (filters.paymentStatus === 'upfront-required' && 
            (invoice.stats.upfrontMet || invoice.stats.paidAmount === 0)) return false;
      }
      
      // All filters passed
      return true;
    })
    .sort((a, b) => new Date(b.payments[0]?.date || 0) - new Date(a.payments[0]?.date || 0));

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
              name="search"
              type="text"
              placeholder="Search payments..."
              value={filters.search}
              onChange={handleFilterChange}
              className="form-input pl-10"
            />
          </div>
          <div className="relative">
          </div>
          <button onClick={recordPayment} className="btn btn-primary flex items-center">
            <DollarSignIcon className="w-5 h-5 mr-2" />
            Record Payment
          </button>
        </div>
      </div>

      <div className="card mb-6">
        <div className="flex flex-wrap gap-4 items-center mb-4 pb-4 border-b border-surface-200 dark:border-surface-700">
          <div>
            <label className="form-label mb-1">Payment Status</label>
            <select 
              name="paymentStatus" 
              value={filters.paymentStatus}
              onChange={handleFilterChange}
              className="form-input py-1 text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="fully-paid">Fully Paid</option>
              <option value="partially-paid">Partially Paid</option>
              <option value="upfront-required">Upfront Required</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </div>
          
          <div>
            <label className="form-label mb-1">Date From</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CalendarIcon className="h-4 w-4 text-surface-400" />
              </div>
              <input
                type="date"
                name="date.from"
                value={filters.date.from}
                onChange={handleFilterChange}
                className="form-input pl-10 py-1 text-sm"
              />
            </div>
          </div>
          
          <div>
            <label className="form-label mb-1">Date To</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CalendarIcon className="h-4 w-4 text-surface-400" />
              </div>
              <input
                type="date"
                name="date.to"
                value={filters.date.to}
                onChange={handleFilterChange}
                className="form-input pl-10 py-1 text-sm"
              />
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-surface-200 dark:border-surface-700">
                <th className="pb-3 font-medium text-surface-600 dark:text-surface-400">Invoice</th>
                <th className="pb-3 font-medium text-surface-600 dark:text-surface-400">Client</th>
                <th className="pb-3 font-medium text-surface-600 dark:text-surface-400">Total</th>
                <th className="pb-3 font-medium text-surface-600 dark:text-surface-400">Paid</th>
                <th className="pb-3 font-medium text-surface-600 dark:text-surface-400">Remaining</th>
                <th className="pb-3 font-medium text-surface-600 dark:text-surface-400">Payment Status</th>
                <th className="pb-3 font-medium text-surface-600 dark:text-surface-400"></th>
              </tr>
            </thead>
            <tbody>
              {processedInvoices.map((invoice) => (
                <>
                  <tr 
                    key={invoice.invoiceId} 
                    className={`border-b border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors ${
                      selectedInvoice.invoiceId === invoice.invoiceId ? 'bg-surface-50 dark:bg-surface-800' : ''
                    }`}
                  >
                    <td className="py-3 text-sm font-medium">{invoice.invoiceId}</td>
                    <td className="py-3 text-sm">{invoice.clientName}</td>
                    <td className="py-3 text-sm">${invoice.total.toFixed(2)}</td>
                    <td className="py-3 text-sm">${invoice.stats.paidAmount.toFixed(2)}</td>
                    <td className="py-3 text-sm">${invoice.stats.remainingAmount.toFixed(2)}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        getPaymentStatusColorClass(invoice.stats)
                      }`}>
                        {getPaymentStatusLabel(invoice.stats)}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button 
                        onClick={() => toggleInvoiceDetails(invoice.invoiceId)}
                        className="text-primary hover:text-primary-dark transition-colors p-1"
                        aria-label={selectedInvoice.showDetails && selectedInvoice.invoiceId === invoice.invoiceId ? 
                          "Hide payment details" : "Show payment details"}
                      >
                        {selectedInvoice.showDetails && selectedInvoice.invoiceId === invoice.invoiceId ? 
                          <ChevronUpIcon className="w-5 h-5" /> : 
                          <ChevronDownIcon className="w-5 h-5" />}
                      </button>
                    </td>
                  </tr>
                  
                  {/* Payment details section */}
                  {selectedInvoice.showDetails && selectedInvoice.invoiceId === invoice.invoiceId && (
                    <tr>
                      <td colSpan="7" className="py-0">
                        <div className="bg-surface-50 dark:bg-surface-800 p-4">
                          <h4 className="text-sm font-medium mb-3">Payment History</h4>
                          <div className="overflow-x-auto">
                            <table className="w-full text-left">
                              <thead>
                                <tr className="border-b border-surface-200 dark:border-surface-700">
                                  <th className="pb-2 text-xs font-medium text-surface-600 dark:text-surface-400">ID</th>
                                  <th className="pb-2 text-xs font-medium text-surface-600 dark:text-surface-400">Date</th>
                                  <th className="pb-2 text-xs font-medium text-surface-600 dark:text-surface-400">Amount</th>
                                  <th className="pb-2 text-xs font-medium text-surface-600 dark:text-surface-400">Method</th>
                                  <th className="pb-2 text-xs font-medium text-surface-600 dark:text-surface-400">Notes</th>
                                  <th className="pb-2 text-xs font-medium text-surface-600 dark:text-surface-400">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {invoice.payments.map((payment) => (
                                  <tr key={payment.id} className="text-sm">
                                    <td className="py-2">{payment.id}</td>
                                    <td className="py-2">{format(new Date(payment.date), 'MMM d, yyyy')}</td>
                                    <td className="py-2 font-medium">{payment.amount}</td>
                                    <td className="py-2">{payment.method}</td>
                                    <td className="py-2">{payment.notes}</td>
                                    <td className="py-2">
                                      <button 
                                        onClick={() => deletePayment(payment.id)}
                                        className="text-red-500 hover:text-red-700 text-xs font-medium transition-colors"
                                      >
                                        Delete
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          
                          <div className="mt-4 flex justify-end">
                            <div className="w-full max-w-md">
                              <div className="bg-white dark:bg-surface-700 p-3 rounded-lg">
                                <div className="flex justify-between mb-2">
                                  <span className="text-sm">Total Invoice Amount:</span>
                                  <span className="text-sm font-medium">${invoice.total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                  <span className="text-sm">Amount Paid:</span>
                                  <span className="text-sm font-medium">${invoice.stats.paidAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                  <span className="text-sm">Remaining Balance:</span>
                                  <span className="text-sm font-medium">${invoice.stats.remainingAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                  <span className="text-sm">Payment Progress:</span>
                                  <span className="text-sm font-medium">{invoice.stats.percentPaid.toFixed(1)}%</span>
                                </div>
                                
                                {/* Progress bar */}
                                <div className="w-full bg-surface-200 dark:bg-surface-600 rounded-full h-2 mt-2 mb-3">
                                  <div 
                                    className="bg-primary h-2 rounded-full" 
                                    style={{ width: `${Math.min(invoice.stats.percentPaid, 100)}%` }}
                                  ></div>
                                </div>
                                
                                <div className="mt-3">
                                  {invoice.stats.percentPaid < 40 ? (
                                    <div className="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 p-2 rounded text-xs">
                                      <strong>Upfront Payment Required:</strong> A minimum of 40% payment is required upfront to cover material costs.
                                    </div>
                                  ) : invoice.stats.remainingAmount > 0 ? (
                                    <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 p-2 rounded text-xs">
                                      <strong>Upfront Payment Received:</strong> Upfront payment requirement has been met.
                                    </div>
                                  ) : (
                                    <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-2 rounded text-xs">
                                      <strong>Fully Paid:</strong> Invoice has been completely paid.
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
              
              {processedInvoices.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-surface-500 dark:text-surface-400">
                    <p className="text-lg mb-2">No payment records found</p>
                    <p className="text-sm">Try adjusting your filters or record a new payment</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Recently Recorded Payments */}
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-3">Recent Payments</h3>
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
                <th className="pb-3 font-medium text-surface-600 dark:text-surface-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.slice(0, 5).map((payment, index) => (
                <tr key={payment.id} className="border-b border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors">
                  <td className="py-3 text-sm">{payment.id}</td>
                  <td className="py-3 text-sm">{payment.client}</td>
                  <td className="py-3 font-medium text-sm">{payment.amount}</td>
                  <td className="py-3 text-sm">{format(new Date(payment.date), 'MMM d, yyyy')}</td>
                  <td className="py-3 text-sm">{payment.method}</td>
                  <td className="py-3">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => toggleInvoiceDetails(payment.invoice)}
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