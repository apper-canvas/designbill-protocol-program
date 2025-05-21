/**
 * Utility functions for payment processing and tracking
 */

/**
 * Validates that upfront payment meets the 40% requirement
 * @param {number} paymentAmount - Amount of the payment
 * @param {number} totalAmount - Total invoice amount
 * @returns {boolean} - Whether payment meets 40% requirement
 */
export const validateUpfrontPayment = (paymentAmount, totalAmount) => {
  if (!paymentAmount || !totalAmount) return false;
  const minimumRequired = totalAmount * 0.4;
  return paymentAmount >= minimumRequired;
};

/**
 * Calculates payment statistics for an invoice
 * @param {number} totalAmount - Total invoice amount
 * @param {Array} payments - Array of payment records
 * @returns {Object} Payment statistics
 */
export const calculatePaymentStats = (totalAmount, payments = []) => {
  const paidAmount = payments.reduce((sum, payment) => {
    // Handle if payment amount is string with $ or number
    const amount = typeof payment.amount === 'string' 
      ? parseFloat(payment.amount.replace(/[$,]/g, '')) 
      : payment.amount;
      
    return sum + (amount || 0);
  }, 0);
  
  const percentPaid = totalAmount > 0 ? (paidAmount / totalAmount) * 100 : 0;
  const remainingAmount = Math.max(0, totalAmount - paidAmount);
  const upfrontMet = percentPaid >= 40;
  
  return {
    paidAmount,
    percentPaid,
    remainingAmount,
    upfrontMet,
    isPaid: remainingAmount === 0,
    isPartiallyPaid: paidAmount > 0 && remainingAmount > 0
  };
};

/**
 * Gets payment status label based on payment statistics
 * @param {Object} paymentStats - Payment statistics object
 * @returns {string} Status label
 */
export const getPaymentStatusLabel = (paymentStats) => {
  if (!paymentStats) return 'Unknown';
  
  if (paymentStats.isPaid) return 'Paid';
  if (!paymentStats.isPartiallyPaid) return 'Unpaid';
  if (paymentStats.upfrontMet) return 'Partially Paid';
  return 'Upfront Required';
};

/**
 * Gets payment status color class based on payment statistics
 * @param {Object} paymentStats - Payment statistics object
 * @returns {string} Tailwind CSS color classes
 */
export const getPaymentStatusColorClass = (paymentStats) => {
  if (!paymentStats) return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
  
  if (paymentStats.isPaid) 
    return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
  if (!paymentStats.isPartiallyPaid) 
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  if (paymentStats.upfrontMet) 
    return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
  return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
};