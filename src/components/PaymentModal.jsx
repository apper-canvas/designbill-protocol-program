import { useState, useEffect } from 'react';
import { getIcon } from '../utils/iconUtils';
import { createPayment } from '../services/PaymentService';
import { toast } from 'react-toastify';
import { validateUpfrontPayment } from '../utils/paymentService';
import { format } from 'date-fns';

const PaymentModal = ({ isOpen, onClose, invoice, onPaymentRecorded, existingPayments = [] }) => {
  const [formData, setFormData] = useState({
    amount: '',
    method: 'Credit Card',
    notes: '',
    date: new Date().toISOString().split('T')[0]
  });
  
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentStats, setPaymentStats] = useState({
    totalPaid: 0,
    percentagePaid: 0,
    totalAmount: 0,
    remainingAmount: 0
  });

  // Get icons
  const XIcon = getIcon('x');
  const DollarSignIcon = getIcon('dollar-sign');
  const CalendarIcon = getIcon('calendar');
  const CreditCardIcon = getIcon('credit-card');
  const CheckIcon = getIcon('check');

  useEffect(() => {
    if (invoice) {
      const totalAmount = parseFloat(invoice.total || 0);
      const totalPaid = existingPayments.reduce((sum, payment) => 
        sum + (parseFloat(payment.amount.replace(/[$,]/g, '')) || 0), 0);
      const remainingAmount = totalAmount - totalPaid;
      const percentagePaid = totalAmount > 0 ? (totalPaid / totalAmount) * 100 : 0;
      
      setPaymentStats({ totalAmount, totalPaid, remainingAmount, percentagePaid });
    }
  }, [invoice, existingPayments]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      setError('');
      
      const amount = parseFloat(formData.amount);
      
      // Validate amount
      if (isNaN(amount) || amount <= 0) {
        setError('Please enter a valid payment amount');
        return;
      }
      
      if (amount > paymentStats.remainingAmount) {
        setError(`Payment cannot exceed the remaining amount: $${paymentStats.remainingAmount.toFixed(2)}`);
        return;
      }
      
      // Check if this is first payment and meets 40% requirement
      if (paymentStats.totalPaid === 0) {
        const isUpfrontValid = validateUpfrontPayment(amount, paymentStats.totalAmount);
        if (!isUpfrontValid) {
          setError(`First payment must be at least 40% ($${(paymentStats.totalAmount * 0.4).toFixed(2)}) of the total invoice amount`);
          return;
        }
      }
      
      // Create payment record
      const paymentData = {
        Name: `Payment for ${invoice.invoiceNumber}`,
        amount: amount,
        date: formData.date,
        method: formData.method,
        status: 'Completed',
        notes: formData.notes,
        isUpfront: paymentStats.totalPaid === 0,
        invoice: invoice.id,
        client: invoice.clientId
      };
      
      const response = await createPayment(paymentData);
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to record payment');
      }
      
      const newPayment = {
        id: response.data?.Id || `PMT-${Date.now().toString().slice(-6)}`,
        invoiceId: invoice.id,
        client: invoice.clientName,
        amount: `$${amount.toFixed(2)}`,
        date: formData.date,
        method: formData.method,
        notes: formData.notes,
        status: 'Completed',
        invoice: invoice.invoiceNumber || 'Unknown'
      };
      
      onPaymentRecorded(newPayment);
      toast.success('Payment recorded successfully');
      onClose();
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error.message || 'Failed to record payment');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-surface-800 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Record Payment</h3>
          <button onClick={onClose} className="p-1">
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        
        <div className="bg-surface-100 dark:bg-surface-700 p-3 rounded-lg mb-6">
          <p className="text-sm mb-1">Invoice: <span className="font-medium">{invoice?.invoiceNumber}</span></p>
          <p className="text-sm mb-1">Client: <span className="font-medium">{invoice?.clientName}</span></p>
          <p className="text-sm mb-1">Total Amount: <span className="font-medium">${paymentStats.totalAmount.toFixed(2)}</span></p>
          <p className="text-sm mb-1">Already Paid: <span className="font-medium">${paymentStats.totalPaid.toFixed(2)} ({paymentStats.percentagePaid.toFixed(1)}%)</span></p>
          <p className="text-sm">Remaining: <span className="font-medium">${paymentStats.remainingAmount.toFixed(2)}</span></p>
        </div>
        
        {error && <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 text-sm rounded-lg">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label">Payment Amount*</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSignIcon className="h-5 w-5 text-surface-400" />
              </div>
              <input type="number" name="amount" step="0.01" className="form-input pl-10" value={formData.amount} onChange={handleInputChange} required />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="form-label">Payment Method*</label>
            <select name="method" className="form-input" value={formData.method} onChange={handleInputChange} required>
              <option>Credit Card</option>
              <option>Bank Transfer</option>
              <option>Cash</option>
              <option>PayPal</option>
              <option>Check</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="form-label">Payment Date*</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CalendarIcon className="h-5 w-5 text-surface-400" />
              </div>
              <input 
                type="date" 
                name="date" 
                className="form-input pl-10" 
                value={formData.date} 
                onChange={handleInputChange} 
                required />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="form-label">Notes (Optional)</label>
            <textarea name="notes" className="form-input" rows="2" value={formData.notes} onChange={handleInputChange}></textarea>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="btn btn-outline">Cancel</button>
            <button type="submit" className="btn btn-primary flex items-center" disabled={isSubmitting}>
              <CheckIcon className="w-5 h-5 mr-2" />
              Record Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;