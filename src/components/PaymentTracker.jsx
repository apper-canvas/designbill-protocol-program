import { useState, useEffect } from 'react';
import { getIcon } from '../utils/iconUtils';

/**
 * PaymentTracker component to visualize payment progress
 * Shows paid amount, pending amount, and upfront payment requirement status
 */
const PaymentTracker = ({ 
  totalAmount = 0, 
  paidAmount = 0, 
  upfrontRequired = true, 
  className = "" 
}) => {
  const [paymentStatus, setPaymentStatus] = useState({
    percentPaid: 0,
    upfrontMet: false,
    remainingAmount: 0
  });

  // Calculate payment metrics
  useEffect(() => {
    if (totalAmount > 0) {
      const percentPaid = (paidAmount / totalAmount) * 100;
      const upfrontMet = percentPaid >= 40;
      const remainingAmount = totalAmount - paidAmount;

      setPaymentStatus({
        percentPaid,
        upfrontMet,
        remainingAmount
      });
    }
  }, [totalAmount, paidAmount]);

  // Get icons
  const CheckCircleIcon = getIcon('check-circle');
  const AlertCircleIcon = getIcon('alert-circle');

  return (
    <div className={`bg-white dark:bg-surface-800 rounded-lg p-4 border border-surface-200 dark:border-surface-700 ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-medium">Payment Progress</h4>
        <div className="flex items-center">
          {upfrontRequired && (
            paymentStatus.upfrontMet ? (
              <div className="flex items-center text-green-600 dark:text-green-400 text-xs font-medium">
                <CheckCircleIcon className="w-4 h-4 mr-1" />
                <span>40% Upfront Paid</span>
              </div>
            ) : (
              <div className="flex items-center text-amber-600 dark:text-amber-400 text-xs font-medium">
                <AlertCircleIcon className="w-4 h-4 mr-1" />
                <span>40% Upfront Required</span>
              </div>
            )
          )}
        </div>
      </div>
      
      <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2.5 mb-3">
        <div 
          className="bg-primary h-2.5 rounded-full" 
          style={{ width: `${Math.min(paymentStatus.percentPaid, 100)}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between text-xs text-surface-600 dark:text-surface-400">
        <span>Paid: ${paidAmount.toFixed(2)} ({paymentStatus.percentPaid.toFixed(1)}%)</span>
        <span>Remaining: ${paymentStatus.remainingAmount.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default PaymentTracker;