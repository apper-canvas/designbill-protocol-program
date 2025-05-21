import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';
import { format } from 'date-fns';

const MainFeature = () => {
  // Icons
  const PlusIcon = getIcon('plus');
  const TrashIcon = getIcon('trash-2');
  const SaveIcon = getIcon('save');
  const PrinterIcon = getIcon('printer');
  const SendIcon = getIcon('send');
  const InfoIcon = getIcon('info');
  const DollarSignIcon = getIcon('dollar-sign');
  
  // Form state
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: `INV-${new Date().getFullYear()}-${String(Math.floor(1000 + Math.random() * 9000)).slice(1)}`,
    issueDate: format(new Date(), 'yyyy-MM-dd'),
    dueDate: format(new Date(new Date().setDate(new Date().getDate() + 30)), 'yyyy-MM-dd'),
    client: {
      name: '',
      email: '',
      address: '',
    },
    lineItems: [
      { id: 1, description: '', quantity: 1, rate: 0, itemType: 'service', amount: 0 }
    ],
    notes: '',
    taxRate: 0,
  });
  
  // Calculated values
  const [calculatedValues, setCalculatedValues] = useState({
    subtotal: 0,
    taxAmount: 0,
    total: 0
  });
  
  // Service options for dropdown
  const serviceOptions = [
    { value: 'consultation', label: 'Design Consultation', defaultRate: 150 },
    { value: 'conceptDevelopment', label: 'Concept Development', defaultRate: 500 },
    { value: 'spacePlanning', label: 'Space Planning', defaultRate: 350 },
    { value: 'furnitureSelection', label: 'Furniture Selection', defaultRate: 250 },
    { value: 'colorScheme', label: 'Color Scheme Development', defaultRate: 200 },
    { value: 'lightingDesign', label: 'Lighting Design', defaultRate: 300 },
    { value: 'accessorizing', label: 'Accessorizing', defaultRate: 175 },
    { value: 'projectManagement', label: 'Project Management', defaultRate: 400 },
    { value: 'finalStyling', label: 'Final Styling', defaultRate: 225 },
    { value: 'custom', label: 'Custom Service', defaultRate: 0 },
  ];
  
  // Calculate total when line items change
  useEffect(() => {
    const subtotal = invoiceData.lineItems.reduce((sum, item) => sum + item.amount, 0);
    const taxAmount = subtotal * (invoiceData.taxRate / 100);
    const total = subtotal + taxAmount;
    
    setCalculatedValues({
      subtotal,
      taxAmount,
      total
    });
  }, [invoiceData.lineItems, invoiceData.taxRate]);
  
  // Update line item amount when quantity or rate changes
  const updateLineItem = (index, field, value) => {
    const updatedItems = [...invoiceData.lineItems];
    
    // If updating a service from dropdown
    if (field === 'service') {
      const selectedService = serviceOptions.find(option => option.value === value);
      updatedItems[index] = {
        ...updatedItems[index],
        description: selectedService.label,
        rate: selectedService.defaultRate,
        amount: selectedService.defaultRate * updatedItems[index].quantity
      };
    } else {
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: value
      };
      
      // Recalculate amount if quantity or rate changed
      if (field === 'quantity' || field === 'rate') {
        updatedItems[index].amount = updatedItems[index].quantity * updatedItems[index].rate;
      }
    }
    
    setInvoiceData({
      ...invoiceData,
      lineItems: updatedItems
    });
  };
  
  // Add new line item
  const addLineItem = () => {
    setInvoiceData({
      ...invoiceData,
      lineItems: [
        ...invoiceData.lineItems,
        { 
          id: invoiceData.lineItems.length + 1, 
          description: '', 
          quantity: 1, 
          rate: 0, 
          itemType: 'service', 
          amount: 0 
        }
      ]
    });
  };
  
  // Remove line item
  const removeLineItem = (index) => {
    if (invoiceData.lineItems.length === 1) {
      toast.error("You must have at least one line item");
      return;
    }
    
    const updatedItems = [...invoiceData.lineItems];
    updatedItems.splice(index, 1);
    
    setInvoiceData({
      ...invoiceData,
      lineItems: updatedItems
    });
  };
  
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('client.')) {
      const clientField = name.split('.')[1];
      setInvoiceData({
        ...invoiceData,
        client: {
          ...invoiceData.client,
          [clientField]: value
        }
      });
    } else {
      setInvoiceData({
        ...invoiceData,
        [name]: value
      });
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!invoiceData.client.name) {
      toast.error("Client name is required");
      return;
    }
    
    if (!invoiceData.client.email) {
      toast.error("Client email is required");
      return;
    }
    
    const hasEmptyItems = invoiceData.lineItems.some(item => !item.description || item.rate <= 0);
    if (hasEmptyItems) {
      toast.error("All line items must have a description and rate");
      return;
    }
    
    // Save invoice
    toast.success("Invoice created successfully!");
    console.log("Invoice data:", invoiceData);
  };
  
  // Animation variants
  const lineItemVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto' }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 overflow-hidden"
    >
      <form onSubmit={handleSubmit}>
        <div className="px-6 py-4 bg-surface-50 dark:bg-surface-700/50 border-b border-surface-200 dark:border-surface-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-xl font-semibold">New Invoice</h3>
            <p className="text-surface-500 dark:text-surface-400 text-sm">
              Fill out the details below to create a new invoice
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary-dark 
                       text-white rounded-lg shadow-sm transition-colors"
            >
              <SaveIcon className="w-4 h-4 mr-2" />
              Save Invoice
            </button>
            
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 bg-surface-200 dark:bg-surface-700 
                       hover:bg-surface-300 dark:hover:bg-surface-600 rounded-lg shadow-sm transition-colors"
              onClick={() => toast.info("Print functionality coming soon!")}
            >
              <PrinterIcon className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Print</span>
            </button>
            
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 bg-secondary hover:bg-secondary-dark 
                       text-white rounded-lg shadow-sm transition-colors"
              onClick={() => toast.info("Email functionality coming soon!")}
            >
              <SendIcon className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Invoice Details */}
            <div>
              <h4 className="font-medium mb-3 text-surface-800 dark:text-surface-200">Invoice Details</h4>
              <div className="space-y-4">
                <div>
                  <label htmlFor="invoiceNumber" className="form-label">Invoice Number</label>
                  <input
                    type="text"
                    id="invoiceNumber"
                    name="invoiceNumber"
                    value={invoiceData.invoiceNumber}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="issueDate" className="form-label">Issue Date</label>
                    <input
                      type="date"
                      id="issueDate"
                      name="issueDate"
                      value={invoiceData.issueDate}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="dueDate" className="form-label">Due Date</label>
                    <input
                      type="date"
                      id="dueDate"
                      name="dueDate"
                      value={invoiceData.dueDate}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Client Information */}
            <div>
              <h4 className="font-medium mb-3 text-surface-800 dark:text-surface-200">Client Information</h4>
              <div className="space-y-4">
                <div>
                  <label htmlFor="clientName" className="form-label">Client Name</label>
                  <input
                    type="text"
                    id="clientName"
                    name="client.name"
                    value={invoiceData.client.name}
                    onChange={handleChange}
                    placeholder="Enter client name"
                    className="form-input"
                  />
                </div>
                
                <div>
                  <label htmlFor="clientEmail" className="form-label">Client Email</label>
                  <input
                    type="email"
                    id="clientEmail"
                    name="client.email"
                    value={invoiceData.client.email}
                    onChange={handleChange}
                    placeholder="Enter client email"
                    className="form-input"
                  />
                </div>
                
                <div>
                  <label htmlFor="clientAddress" className="form-label">Client Address</label>
                  <textarea
                    id="clientAddress"
                    name="client.address"
                    value={invoiceData.client.address}
                    onChange={handleChange}
                    placeholder="Enter client address"
                    rows="2"
                    className="form-input"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          
          {/* Line Items */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-surface-800 dark:text-surface-200">Services & Products</h4>
              <button
                type="button"
                onClick={addLineItem}
                className="inline-flex items-center text-sm px-2.5 py-1.5 bg-primary/10 text-primary dark:bg-primary/20
                         rounded hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors"
              >
                <PlusIcon className="w-4 h-4 mr-1" />
                Add Item
              </button>
            </div>
            
            <div className="border border-surface-200 dark:border-surface-700 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-surface-50 dark:bg-surface-700/50">
                      <th className="text-left px-4 py-3 text-sm font-medium text-surface-500 dark:text-surface-400">Service/Product</th>
                      <th className="text-right px-4 py-3 text-sm font-medium text-surface-500 dark:text-surface-400 w-20">Qty</th>
                      <th className="text-right px-4 py-3 text-sm font-medium text-surface-500 dark:text-surface-400 w-32">Rate</th>
                      <th className="text-right px-4 py-3 text-sm font-medium text-surface-500 dark:text-surface-400 w-32">Amount</th>
                      <th className="px-4 py-3 w-16"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {invoiceData.lineItems.map((item, index) => (
                        <motion.tr 
                          key={item.id}
                          variants={lineItemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          className="border-t border-surface-200 dark:border-surface-700"
                        >
                          <td className="px-4 py-3">
                            <div className="space-y-2">
                              <select
                                value={serviceOptions.find(option => option.label === item.description)?.value || 'custom'}
                                onChange={(e) => updateLineItem(index, 'service', e.target.value)}
                                className="form-input text-sm"
                              >
                                <option value="" disabled>Select a service</option>
                                {serviceOptions.map(option => (
                                  <option key={option.value} value={option.value}>
                                    {option.label} {option.value !== 'custom' ? `($${option.defaultRate}/hr)` : ''}
                                  </option>
                                ))}
                              </select>
                              
                              {(item.description === 'Custom Service' || !item.description) && (
                                <input
                                  type="text"
                                  value={item.description}
                                  onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                                  placeholder="Enter service description"
                                  className="form-input text-sm"
                                />
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateLineItem(index, 'quantity', parseInt(e.target.value || 0))}
                              min="1"
                              className="form-input text-sm text-right"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <DollarSignIcon className="w-4 h-4 text-surface-500" />
                              </div>
                              <input
                                type="number"
                                value={item.rate}
                                onChange={(e) => updateLineItem(index, 'rate', parseFloat(e.target.value || 0))}
                                min="0"
                                step="0.01"
                                className="form-input text-sm text-right pl-8"
                              />
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right font-medium">
                            ${item.amount.toFixed(2)}
                          </td>
                          <td className="px-4 py-3">
                            <button
                              type="button"
                              onClick={() => removeLineItem(index)}
                              className="p-1.5 text-surface-500 hover:text-red-500 transition-colors rounded-md 
                                       hover:bg-red-50 dark:hover:bg-red-950/30"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Invoice Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Additional Notes */}
            <div>
              <h4 className="font-medium mb-3 text-surface-800 dark:text-surface-200">Additional Notes</h4>
              <textarea
                name="notes"
                value={invoiceData.notes}
                onChange={handleChange}
                placeholder="Add any additional notes or payment instructions"
                rows="4"
                className="form-input"
              ></textarea>
              
              <div className="mt-4 flex items-start p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg">
                <InfoIcon className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm">
                  Include specific details about payment methods, deadlines, or design-specific information for your client.
                </p>
              </div>
            </div>
            
            {/* Total Calculation */}
            <div>
              <h4 className="font-medium mb-3 text-surface-800 dark:text-surface-200">Total</h4>
              
              <div className="bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg p-4">
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-surface-600 dark:text-surface-400">Subtotal</span>
                    <span className="font-medium">${calculatedValues.subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-surface-600 dark:text-surface-400 mr-2">Tax Rate (%)</span>
                      <div className="relative w-20">
                        <input
                          type="number"
                          name="taxRate"
                          value={invoiceData.taxRate}
                          onChange={handleChange}
                          min="0"
                          max="100"
                          step="0.1"
                          className="form-input text-right pr-6 py-1 text-sm"
                        />
                        <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                          <span className="text-surface-500">%</span>
                        </div>
                      </div>
                    </div>
                    <span className="font-medium">${calculatedValues.taxAmount.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-surface-200 dark:border-surface-700 pt-3 flex justify-between items-center">
                    <span className="font-medium text-lg">Total</span>
                    <span className="font-bold text-lg">${calculatedValues.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-lg 
                           shadow-lg shadow-primary/20 font-medium transition-colors flex items-center justify-center"
                >
                  <SaveIcon className="w-5 h-5 mr-2" />
                  Create Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default MainFeature;