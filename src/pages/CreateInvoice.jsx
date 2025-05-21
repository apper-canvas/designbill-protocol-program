import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { getIcon } from '../utils/iconUtils';
import roomTypes from '../utils/roomTypes';
import roomItems from '../utils/roomItems';

const CreateInvoice = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  
  // Icons
  const SaveIcon = getIcon('save');
  const TrashIcon = getIcon('trash-2');
  const PlusIcon = getIcon('plus');
  const ArrowLeftIcon = getIcon('arrow-left');
  const ArrowRightIcon = getIcon('arrow-right');
  const CheckIcon = getIcon('check');
  const EditIcon = getIcon('edit');
  const DollarIcon = getIcon('dollar-sign');
  const InfoIcon = getIcon('info');
  const HomeIcon = getIcon('home');
  const AlertIcon = getIcon('alert-circle');
  const MailIcon = getIcon('mail');
  const ShareIcon = getIcon('share');
  const PrintIcon = getIcon('printer');
  
  // Form steps
  const steps = [
    { id: 'client', name: 'Client Details' },
    { id: 'rooms', name: 'Room Selection' },
    { id: 'items', name: 'Items & Services' },
    { id: 'review', name: 'Review & Create' }
  ];
  
  const [currentStep, setCurrentStep] = useState(0);
  const [created, setCreated] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [customRoomName, setCustomRoomName] = useState('');
  const [readOnly, setReadOnly] = useState(false);
  
  // Invoice state
  const [invoice, setInvoice] = useState({
    invoiceNumber: `INV-${new Date().getFullYear()}-${String(Math.floor(1000 + Math.random() * 9000)).slice(1)}`,
    issueDate: format(new Date(), 'yyyy-MM-dd'),
    dueDate: format(new Date(new Date().setDate(new Date().getDate() + 30)), 'yyyy-MM-dd'),
    client: {
      name: '',
      email: '',
      phone: '',
      address: ''
    },
    projectDetails: {
      name: '',
      address: '',
      startDate: format(new Date(), 'yyyy-MM-dd'),
      additionalInfo: ''
    },
    rooms: [],
    lineItems: [],
    taxRate: 5,
    discount: 0,
    notes: ''
  });
  
  // Calculate totals
  const [totals, setTotals] = useState({
    subtotal: 0,
    tax: 0,
    discount: 0,
    total: 0
  });

  // Validation states
  const [errors, setErrors] = useState({
    client: {},
    projectDetails: {},
    rooms: false,
    items: false
  });

  // Check if we're viewing an existing invoice
  useEffect(() => {
    if (id) {
      // Try to load the invoice from localStorage
      const savedInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
      const existingInvoice = savedInvoices.find(inv => inv.invoiceNumber === id);
      
      if (existingInvoice) {
        setInvoice(existingInvoice);
        setReadOnly(true);
        setCreated(true); // Show the view mode
        
        // If we have the totals from localStorage, use them
        if (existingInvoice.calculatedTotals) {
          setTotals(existingInvoice.calculatedTotals);
        }
      } else {
        toast.error("Invoice not found");
        navigate('/invoices');
      }
    } else if (location.state?.invoice) {
      setInvoice(location.state.invoice);
      setCreated(true);
    }
  }, [id, navigate, location]);
  
  // Update totals when line items change
  useEffect(() => {
    const subtotal = invoice.lineItems.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * (invoice.taxRate / 100);
    const discount = subtotal * (invoice.discount / 100);
    const total = subtotal + tax - discount;
    
    setTotals({
      subtotal,
      tax,
      discount,
      total
    });
  }, [invoice.lineItems, invoice.taxRate, invoice.discount]);
  
  // Add a room to the invoice
  const addRoom = (roomType) => {
    // If it's a custom room
    if (roomType.id === 'custom' && customRoomName.trim()) {
      const customRoom = {
        id: `custom-${Date.now()}`,
        name: customRoomName.trim(),
        icon: 'layout',
        isCustom: true
      };
      
      setInvoice({
        ...invoice,
        rooms: [...invoice.rooms, customRoom]
      });
      
      setSelectedRooms([...selectedRooms, customRoom.id]);
      setCustomRoomName('');
    } 
    // If it's a predefined room
    else if (roomType.id !== 'custom') {
      // Check if the room is already added
      if (!invoice.rooms.some(room => room.id === roomType.id)) {
        setInvoice({
          ...invoice,
          rooms: [...invoice.rooms, roomType]
        });
        
        setSelectedRooms([...selectedRooms, roomType.id]);
      }
    }
  };
  
  // Remove a room from the invoice
  const removeRoom = (roomId) => {
    setInvoice({
      ...invoice,
      rooms: invoice.rooms.filter(room => room.id !== roomId),
      // Also remove any line items for this room
      lineItems: invoice.lineItems.filter(item => item.roomId !== roomId)
    });
    
    setSelectedRooms(selectedRooms.filter(id => id !== roomId));
  };
  
  // Add a line item to the invoice
  const addLineItem = (roomId, item) => {
    const room = invoice.rooms.find(r => r.id === roomId);
    const newItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      roomId,
      roomName: room.name,
      name: item ? item.name : '',
      dimensions: '',
      squareFootage: '',
      // description field removed as requested
      measurement: item ? item.defaultMeasurement : 'per unit',
      quantity: 1,
      rate: item ? item.defaultRate : 0,
      total: item ? item.defaultRate : 0,
      pricingOptions: item ? item.pricingOptions : ['per unit', 'per sq ft', 'per running ft', 'custom quote']
    };
    
    setInvoice({
      ...invoice,
      lineItems: [...invoice.lineItems, newItem]
    });
  };
  
  // Add a custom line item
  const addCustomLineItem = (roomId) => {
    const room = invoice.rooms.find(r => r.id === roomId);
    addLineItem(roomId);
  };
  
  // Update a line item
  const updateLineItem = (itemId, field, value) => {
    const updatedItems = invoice.lineItems.map(item => {
      if (item.id === itemId) {
        const updatedItem = { ...item, [field]: value };
        
        // Recalculate total if quantity, rate, or measurement changes
        if (field === 'quantity' || field === 'rate' || field === 'measurement') {
          if (updatedItem.measurement === 'custom quote') {
            updatedItem.total = parseFloat(updatedItem.rate || 0);
          } else {
            updatedItem.total = parseFloat(updatedItem.quantity || 0) * parseFloat(updatedItem.rate || 0);
          }
        }
        
        return updatedItem;
      }
      return item;
    });
    
    setInvoice({
      ...invoice,
      lineItems: updatedItems
    });
  };
  
  // Remove a line item
  const removeLineItem = (itemId) => {
    setInvoice({
      ...invoice,
      lineItems: invoice.lineItems.filter(item => item.id !== itemId)
    });
  };
  
  // Handle input changes for client and project details
  const handleInputChange = (section, field, value) => {
    setInvoice({
      ...invoice,
      [section]: {
        ...invoice[section],
        [field]: value
      }
    });
    
    // Clear error if field was previously in error
    if (errors[section] && errors[section][field]) {
      setErrors({
        ...errors,
        [section]: {
          ...errors[section],
          [field]: null
        }
      });
    }
  };
  
  // Handle general input changes
  const handleGeneralChange = (field, value) => {
    setInvoice({
      ...invoice,
      [field]: value
    });
  };
  
  // Validate the current step
  const validateStep = () => {
    let valid = true;
    let newErrors = { ...errors };
    
    if (currentStep === 0) {
      // Validate client details
      const clientErrors = {};
      
      if (!invoice.client.name.trim()) {
        clientErrors.name = 'Client name is required';
        valid = false;
      }
      
      if (!invoice.client.email.trim()) {
        clientErrors.email = 'Client email is required';
        valid = false;
      } else if (!/^\S+@\S+\.\S+$/.test(invoice.client.email)) {
        clientErrors.email = 'Invalid email format';
        valid = false;
      }
      
      if (!invoice.projectDetails.name.trim()) {
        newErrors.projectDetails = { 
          ...newErrors.projectDetails, 
          name: 'Project name is required' 
        };
        valid = false;
      }
      
      newErrors.client = clientErrors;
    } 
    else if (currentStep === 1) {
      // Validate rooms
      if (invoice.rooms.length === 0) {
        newErrors.rooms = 'At least one room must be selected';
        valid = false;
      } else {
        newErrors.rooms = false;
      }
    }
    else if (currentStep === 2) {
      // Validate line items
      if (invoice.lineItems.length === 0) {
        newErrors.items = 'At least one item must be added';
        valid = false;
        toast.error('Please add at least one item to the invoice');
      } else {
        // Check if all items have names and rates
        const hasInvalidItems = invoice.lineItems.some(
          item => !item.name.trim() || (item.measurement !== 'custom quote' && (!item.quantity || !item.rate))
        );
        
        if (hasInvalidItems) {
          newErrors.items = 'All items must have a name, quantity, and rate';
          valid = false;
          toast.error('Please complete all item details');
        } else {
          newErrors.items = false;
        }
      }
    }
    
    setErrors(newErrors);
    return valid;
  };
  
  // Move to the next step
  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Move to the previous step
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };
  
  // Share invoice via WhatsApp
  const shareViaWhatsApp = () => {
    const text = `
Hi ${invoice.client.name},

Your invoice ${invoice.invoiceNumber} for ${invoice.projectDetails.name} has been created.

Total Amount: $${totals.total.toFixed(2)}
Due Date: ${format(new Date(invoice.dueDate), 'MMM d, yyyy')}

Thank you for your business!
    `;
    
    const encodedText = encodeURIComponent(text.trim());
    window.open(`https://wa.me/?text=${encodedText}`, '_blank');
    toast.success('Invoice ready to share via WhatsApp');
  };
  
  // Share invoice via Email
  const shareViaEmail = () => {
    const subject = `Invoice ${invoice.invoiceNumber} for ${invoice.projectDetails.name}`;
    const body = `
Hi ${invoice.client.name},

Please find your invoice details below:

Invoice: ${invoice.invoiceNumber}
Project: ${invoice.projectDetails.name}
Total Amount: $${totals.total.toFixed(2)}
Due Date: ${format(new Date(invoice.dueDate), 'MMM d, yyyy')}

Thank you for your business!
    `;
    
    const mailtoLink = `mailto:${invoice.client.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.trim())}`;
    window.open(mailtoLink, '_blank');
    toast.success('Invoice ready to share via Email');
  };

  // Submit the invoice
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateStep()) {
      // Save invoice to localStorage
      const savedInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
      
      // Add calculated totals to the invoice for storage
      const completeInvoice = {
        ...invoice,
        calculatedTotals: totals,
        status: 'Pending', // Default status for new invoices
        date: format(new Date(), 'yyyy-MM-dd')
      };
      
      localStorage.setItem('invoices', JSON.stringify([...savedInvoices, completeInvoice]));
      
      setCreated(true);
      toast.success('Invoice created successfully!');
    }
  };
  
  return (
    <div className="container mx-auto max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Create New Invoice</h1>
        <p className="text-surface-500 dark:text-surface-400 hidden md:block">
          Create a professional invoice for your interior design project
        </p>
      </div>
      
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className={`flex flex-col items-center relative ${
                index === steps.length - 1 ? '' : 'flex-1'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep > index 
                  ? 'bg-green-500 text-white' 
                  : currentStep === index 
                    ? 'bg-primary text-white' 
                    : 'bg-surface-200 dark:bg-surface-700 text-surface-500 dark:text-surface-400'
              }`}>
                {currentStep > index ? (
                  <CheckIcon className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              
              <span className={`mt-2 text-sm font-medium ${
                currentStep >= index 
                  ? 'text-surface-900 dark:text-surface-100' 
                  : 'text-surface-500 dark:text-surface-400'
              }`}>
                {step.name}
              </span>
              
              {index < steps.length - 1 && (
                <div className={`absolute top-5 w-full h-0.5 left-1/2 ${
                  currentStep > index 
                    ? 'bg-green-500' 
                    : 'bg-surface-200 dark:bg-surface-700'
                }`}></div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="card">
        {!created && currentStep === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Client Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="clientName" className="form-label">Client Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="clientName"
                    value={invoice.client.name}
                    onChange={(e) => handleInputChange('client', 'name', e.target.value)}
                    className={`form-input ${errors.client.name ? 'border-red-500' : ''}`}
                    placeholder="Enter client name"
                  />
                  {errors.client.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.client.name}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="clientEmail" className="form-label">Client Email <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    id="clientEmail"
                    value={invoice.client.email}
                    onChange={(e) => handleInputChange('client', 'email', e.target.value)}
                    className={`form-input ${errors.client.email ? 'border-red-500' : ''}`}
                    placeholder="Enter client email"
                  />
                  {errors.client.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.client.email}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="clientPhone" className="form-label">Client Phone</label>
                  <input
                    type="text"
                    id="clientPhone"
                    value={invoice.client.phone}
                    onChange={(e) => handleInputChange('client', 'phone', e.target.value)}
                    className="form-input"
                    placeholder="Enter client phone"
                  />
                </div>
                
                <div>
                  <label htmlFor="clientAddress" className="form-label">Client Address</label>
                  <input
                    type="text"
                    id="clientAddress"
                    value={invoice.client.address}
                    onChange={(e) => handleInputChange('client', 'address', e.target.value)}
                    className="form-input"
                    placeholder="Enter client address"
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Project Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="projectName" className="form-label">Project Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="projectName"
                    value={invoice.projectDetails.name}
                    onChange={(e) => handleInputChange('projectDetails', 'name', e.target.value)}
                    className={`form-input ${errors.projectDetails && errors.projectDetails.name ? 'border-red-500' : ''}`}
                    placeholder="Enter project name"
                  />
                  {errors.projectDetails && errors.projectDetails.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.projectDetails.name}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="projectAddress" className="form-label">Project Address</label>
                  <input
                    type="text"
                    id="projectAddress"
                    value={invoice.projectDetails.address}
                    onChange={(e) => handleInputChange('projectDetails', 'address', e.target.value)}
                    className="form-input"
                    placeholder="Enter project address"
                  />
                </div>
                
                <div>
                  <label htmlFor="projectStart" className="form-label">Project Start Date</label>
                  <input
                    type="date"
                    id="projectStart"
                    value={invoice.projectDetails.startDate}
                    onChange={(e) => handleInputChange('projectDetails', 'startDate', e.target.value)}
                    className="form-input"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="projectInfo" className="form-label">Additional Information</label>
                  <textarea
                    id="projectInfo"
                    value={invoice.projectDetails.additionalInfo}
                    onChange={(e) => handleInputChange('projectDetails', 'additionalInfo', e.target.value)}
                    className="form-input"
                    rows="3"
                    placeholder="Any additional project details"
                  ></textarea>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Invoice Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="invoiceNumber" className="form-label">Invoice Number</label>
                  <input
                    type="text"
                    id="invoiceNumber"
                    value={invoice.invoiceNumber}
                    onChange={(e) => handleGeneralChange('invoiceNumber', e.target.value)}
                    className="form-input"
                  />
                </div>
                
                <div>
                  <label htmlFor="issueDate" className="form-label">Issue Date</label>
                  <input
                    type="date"
                    id="issueDate"
                    value={invoice.issueDate}
                    onChange={(e) => handleGeneralChange('issueDate', e.target.value)}
                    className="form-input"
                  />
                </div>
                
                <div>
                  <label htmlFor="dueDate" className="form-label">Due Date</label>
                  <input
                    type="date"
                    id="dueDate"
                    value={invoice.dueDate}
                    onChange={(e) => handleGeneralChange('dueDate', e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {!created && currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Select Rooms</h2>
              <p className="text-surface-500 dark:text-surface-400 mb-4">
                Choose the rooms that are part of this interior design project
              </p>
              
              {errors.rooms && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg flex items-start">
                  <AlertIcon className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  <p>{errors.rooms}</p>
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                {roomTypes.map((room) => {
                  const RoomIcon = getIcon(room.icon);
                  const isSelected = selectedRooms.includes(room.id);
                  const isAdded = invoice.rooms.some(r => r.id === room.id);
                  
                  return (
                    <div 
                      key={room.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-primary bg-primary/5 dark:bg-primary/10' 
                          : 'border-surface-200 dark:border-surface-700 hover:border-primary/50'
                      }`}
                      onClick={() => {
                        if (!isAdded) {
                          addRoom(room);
                        }
                      }}
                    >
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                          isSelected ? 'bg-primary/20 dark:bg-primary/30' : 'bg-surface-100 dark:bg-surface-800'
                        }`}>
                          <RoomIcon className={`w-5 h-5 ${isSelected ? 'text-primary' : 'text-surface-500 dark:text-surface-400'}`} />
                        </div>
                        <div>
                          <h3 className="font-medium">{room.name}</h3>
                          {room.id === 'custom' && (
                            <input
                              type="text"
                              value={customRoomName}
                              onChange={(e) => setCustomRoomName(e.target.value)}
                              className="form-input mt-2 text-sm py-1"
                              placeholder="Enter room name"
                              onClick={(e) => e.stopPropagation()}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <h3 className="font-semibold mb-3">Selected Rooms</h3>
              {invoice.rooms.length === 0 ? (
                <p className="text-surface-500 dark:text-surface-400 italic">No rooms selected yet</p>
              ) : (
                <div className="space-y-2">
                  {invoice.rooms.map((room) => {
                    const RoomIcon = getIcon(room.icon);
                    return (
                      <div 
                        key={room.id}
                        className="flex items-center justify-between p-3 bg-surface-50 dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700"
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mr-3">
                            <RoomIcon className="w-4 h-4 text-primary" />
                          </div>
                          <span>{room.name}</span>
                        </div>
                        <button 
                          type="button"
                          onClick={() => removeRoom(room.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}
        {!created && currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Add Items & Services</h2>
              <p className="text-surface-500 dark:text-surface-400 mb-4">
                Select items and services for each room in your project
              </p>
              
              {errors.items && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg flex items-start">
                  <AlertIcon className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  <p>{errors.items}</p>
                </div>
              )}
              
              {invoice.rooms.map((room) => {
                // Get the default items for this room type if available
                const defaultItems = roomItems[room.id] || [];
                // Get items that belong to this room
                const roomLineItems = invoice.lineItems.filter(item => item.roomId === room.id);
                
                return (
                  <div 
                    key={room.id}
                    className="mb-8 p-4 border border-surface-200 dark:border-surface-700 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">{room.name}</h3>
                      <button
                        type="button"
                        onClick={() => addCustomLineItem(room.id)}
                        className="btn btn-outline text-sm py-1 flex items-center"
                      >
                        <PlusIcon className="w-4 h-4 mr-1" /> Add Custom Item
                      </button>
                    </div>
                    
                    {/* Default room items */}
                    {!room.isCustom && defaultItems.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-surface-500 dark:text-surface-400 mb-2">Suggested Items</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                          {defaultItems.map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => addLineItem(room.id, item)}
                              className="flex items-center p-2 border border-surface-200 dark:border-surface-700 rounded-md hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors text-left"
                            >
                              <PlusIcon className="w-4 h-4 mr-2 text-primary" />
                              <span className="text-sm">{item.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Line items for this room */}
                    {roomLineItems.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-surface-200 dark:border-surface-700">
                              <th className="text-left py-2 text-xs font-medium text-surface-500 dark:text-surface-400">Item</th>
                              <th className="text-left py-2 text-xs font-medium text-surface-500 dark:text-surface-400">Dimensions</th>
                              <th className="text-left py-2 text-xs font-medium text-surface-500 dark:text-surface-400">Square Footage</th>
                              <th className="text-left py-2 text-xs font-medium text-surface-500 dark:text-surface-400">Measurement</th> 
                              <th className="text-center py-2 text-xs font-medium text-surface-500 dark:text-surface-400">Qty</th>
                              <th className="text-right py-2 text-xs font-medium text-surface-500 dark:text-surface-400">Rate</th>
                              <th className="text-right py-2 text-xs font-medium text-surface-500 dark:text-surface-400">Total</th>
                              <th className="text-center py-2 text-xs font-medium text-surface-500 dark:text-surface-400">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {roomLineItems.map((item) => (
                              <tr key={item.id} className="border-b border-surface-200 dark:border-surface-700">
                                <td className="py-2">
                                  <input
                                    type="text"
                                    value={item.name}
                                    onChange={(e) => updateLineItem(item.id, 'name', e.target.value)}
                                    className="form-input text-sm py-1"
                                    placeholder="Item name"
                                  />
                                </td>
                                <td className="py-2">
                                  <input 
                                    type="text" 
                                    value={item.dimensions} 
                                    onChange={(e) => updateLineItem(item.id, 'dimensions', e.target.value)} 
                                    className="form-input text-sm py-1" 
                                    placeholder="e.g. 60\" x 80\""
                                  />
                                </td>
                                <td className="py-2">
                                  <input 
                                    type="text" 
                                    value={item.squareFootage} 
                                    onChange={(e) => updateLineItem(item.id, 'squareFootage', e.target.value)} 
                                    className="form-input text-sm py-1"
                                    placeholder="Description"
                                  />
                                </td>
                                <td className="py-2">
                                  <select
                                    value={item.measurement}
                                    onChange={(e) => updateLineItem(item.id, 'measurement', e.target.value)}
                                    className="form-input text-sm py-1"
                                  >
                                    {item.pricingOptions.map((option) => (
                                      <option key={option} value={option}>{option}</option>
                                    ))}
                                  </select>
                                </td>
                                <td className="py-2">
                                  <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => updateLineItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                                    className="form-input text-sm py-1 text-center w-20"
                                    min="0"
                                    step="1"
                                    disabled={item.measurement === 'custom quote'}
                                  />
                                </td>
                                <td className="py-2">
                                  <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                                      <DollarIcon className="w-3 h-3 text-surface-500" />
                                    </div>
                                    <input
                                      type="number"
                                      value={item.rate}
                                      onChange={(e) => updateLineItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                                      className="form-input text-sm py-1 pl-6 text-right w-24"
                                      min="0"
                                      step="0.01"
                                    />
                                  </div>
                                </td>
                                <td className="py-2 text-right font-medium">
                                  ${item.total.toFixed(2)}
                                </td>
                                <td className="py-2 text-center">
                                  <button
                                    type="button"
                                    onClick={() => removeLineItem(item.id)}
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                  >
                                    <TrashIcon className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-surface-500 dark:text-surface-400 italic text-sm">
                        No items added for this room yet
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
        
        {!created && currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Review Invoice</h2>
              
              <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Client & Project</h3>
                  <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-lg">
                    <p><span className="font-medium">Client:</span> {invoice.client.name}</p>
                    <p><span className="font-medium">Email:</span> {invoice.client.email}</p>
                    <p><span className="font-medium">Project:</span> {invoice.projectDetails.name}</p>
                    <p><span className="font-medium">Issue Date:</span> {format(new Date(invoice.issueDate), 'MMM d, yyyy')}</p>
                    <p><span className="font-medium">Due Date:</span> {format(new Date(invoice.dueDate), 'MMM d, yyyy')}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Rooms</h3>
                  <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-lg">
                    <div className="flex flex-wrap gap-2">
                      {invoice.rooms.map((room) => {
                        const RoomIcon = getIcon(room.icon);
                        return (
                          <div key={room.id} className="inline-flex items-center bg-white dark:bg-surface-700 px-2 py-1 rounded-full border border-surface-200 dark:border-surface-600">
                            <RoomIcon className="w-4 h-4 mr-1 text-primary" />
                            <span className="text-sm">{room.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Items & Services ({invoice.lineItems.length})</h3>
                
                <div className="overflow-x-auto border border-surface-200 dark:border-surface-700 rounded-lg">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-surface-50 dark:bg-surface-800">
                        <th className="text-left p-3 text-xs font-medium text-surface-500 dark:text-surface-400">Room</th>
                        <th className="text-left p-3 text-xs font-medium text-surface-500 dark:text-surface-400">Item</th>
                        <th className="text-left p-3 text-xs font-medium text-surface-500 dark:text-surface-400 hidden md:table-cell">Dimensions</th>
                        <th className="text-left p-3 text-xs font-medium text-surface-500 dark:text-surface-400 hidden md:table-cell">Square Footage</th>
                        <th className="text-center p-3 text-xs font-medium text-surface-500 dark:text-surface-400">Qty</th>
                        <th className="text-right p-3 text-xs font-medium text-surface-500 dark:text-surface-400">Rate</th>
                        <th className="text-right p-3 text-xs font-medium text-surface-500 dark:text-surface-400">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoice.lineItems.map((item) => (
                        <tr key={item.id} className="border-t border-surface-200 dark:border-surface-700">
                          <td className="p-3">{item.roomName}</td>
                          <td className="p-3">{item.name}</td>
                          <td className="p-3 hidden md:table-cell">{item.dimensions || '-'}</td>
                          <td className="p-3 hidden md:table-cell">{item.squareFootage || '-'}</td>
                          <td className="p-3 text-center">
                            {item.measurement === 'custom quote' ? '-' : item.quantity}
                            <span className="text-xs text-surface-500 ml-1">
                              {item.measurement !== 'custom quote' && item.measurement !== 'per unit' ? item.measurement : ''}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            ${item.rate.toFixed(2)}
                            {item.measurement !== 'custom quote' && item.measurement !== 'per unit' && (
                              <span className="text-xs text-surface-500">/{item.measurement.replace('per ', '')}</span>
                            )}
                          </td>
                          <td className="p-3 text-right font-medium">${item.total.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="mb-6 flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <h3 className="font-medium mb-2">Notes & Terms</h3>
                  <textarea
                    value={invoice.notes}
                    onChange={(e) => handleGeneralChange('notes', e.target.value)}
                    className="form-input"
                    rows="4"
                    placeholder="Add any notes or terms & conditions"
                  ></textarea>
                </div>
                
                <div className="md:w-1/2">
                  <h3 className="font-medium mb-2">Invoice Summary</h3>
                  <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${totals.subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span>Tax</span>
                        <div className="relative w-16 inline-block">
                          <input
                            type="number"
                            value={invoice.taxRate}
                            onChange={(e) => handleGeneralChange('taxRate', parseFloat(e.target.value) || 0)}
                            className="form-input text-sm py-1 pr-6 text-right"
                            min="0"
                            max="100"
                            step="0.1"
                          />
                          <span className="absolute inset-y-0 right-0 pr-2 flex items-center text-xs text-surface-500">%</span>
                        </div>
                      </div>
                      <span>${totals.tax.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span>Discount</span>
                        <div className="relative w-16 inline-block">
                          <input
                            type="number"
                            value={invoice.discount}
                            onChange={(e) => handleGeneralChange('discount', parseFloat(e.target.value) || 0)}
                            className="form-input text-sm py-1 pr-6 text-right"
                            min="0"
                            max="100"
                            step="0.1"
                          />
                          <span className="absolute inset-y-0 right-0 pr-2 flex items-center text-xs text-surface-500">%</span>
                        </div>
                      </div>
                      <span>${totals.discount.toFixed(2)}</span>
                    </div>
                    
                    <div className="pt-2 border-t border-surface-200 dark:border-surface-700 flex justify-between font-bold">
                      <span>Total</span>
                      <span>${totals.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* View Created Invoice */}
        {created && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Invoice {invoice.invoiceNumber}</h2>
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                Pending
              </span>
            </div>

            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="md:w-1/2">
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-surface-500 dark:text-surface-400 mb-1">Bill To:</h3>
                  <p className="font-medium">{invoice.client.name}</p>
                  <p>{invoice.client.email}</p>
                  {invoice.client.phone && <p>{invoice.client.phone}</p>}
                  {invoice.client.address && <p>{invoice.client.address}</p>}
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-surface-500 dark:text-surface-400 mb-1">Project:</h3>
                  <p className="font-medium">{invoice.projectDetails.name}</p>
                  {invoice.projectDetails.address && <p>{invoice.projectDetails.address}</p>}
                </div>
              </div>
              
              <div className="md:w-1/2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-surface-500 dark:text-surface-400 mb-1">Invoice Number:</h3>
                    <p>{invoice.invoiceNumber}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-surface-500 dark:text-surface-400 mb-1">Date Issued:</h3>
                    <p>{format(new Date(invoice.issueDate), 'MMM d, yyyy')}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-surface-500 dark:text-surface-400 mb-1">Due Date:</h3>
                    <p>{format(new Date(invoice.dueDate), 'MMM d, yyyy')}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-surface-500 dark:text-surface-400 mb-1">Total Due:</h3>
                    <p className="font-bold text-lg">${totals.total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3">Invoice Items</h3>
              <div className="overflow-x-auto border border-surface-200 dark:border-surface-700 rounded-lg">
                <table className="w-full">
                  <thead>
                    <tr className="bg-surface-50 dark:bg-surface-800">
                      <th className="text-left p-3 text-xs font-medium text-surface-500 dark:text-surface-400">Room</th>
                      <th className="text-left p-3 text-xs font-medium text-surface-500 dark:text-surface-400">Item</th>
                      <th className="text-left p-3 text-xs font-medium text-surface-500 dark:text-surface-400 hidden md:table-cell">Dimensions</th>
                      <th className="text-left p-3 text-xs font-medium text-surface-500 dark:text-surface-400 hidden md:table-cell">Square Footage</th>
                      <th className="text-center p-3 text-xs font-medium text-surface-500 dark:text-surface-400">Qty</th>
                      <th className="text-right p-3 text-xs font-medium text-surface-500 dark:text-surface-400">Rate</th>
                      <th className="text-right p-3 text-xs font-medium text-surface-500 dark:text-surface-400">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.lineItems.map((item) => (
                      <tr key={item.id} className="border-t border-surface-200 dark:border-surface-700">
                        <td className="p-3">{item.roomName}</td>
                        <td className="p-3">{item.name}</td>
                        <td className="p-3 hidden md:table-cell">{item.dimensions || '-'}</td>
                        <td className="p-3 hidden md:table-cell">{item.squareFootage || '-'}</td>
                        <td className="p-3 text-center">
                          {item.measurement === 'custom quote' ? '-' : item.quantity}
                          <span className="text-xs text-surface-500 ml-1">
                            {item.measurement !== 'custom quote' && item.measurement !== 'per unit' ? item.measurement : ''}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          ${typeof item.rate === 'number' ? item.rate.toFixed(2) : item.rate}
                          {item.measurement !== 'custom quote' && item.measurement !== 'per unit' && (
                            <span className="text-xs text-surface-500">/{item.measurement.replace('per ', '')}</span>
                          )}
                        </td>
                        <td className="p-3 text-right font-medium">${typeof item.total === 'number' ? item.total.toFixed(2) : item.total}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800">
                      <td colSpan="4" className="p-3"></td>
                      <td className="p-3 text-right font-medium">Subtotal</td>
                      <td className="p-3 text-right">${totals.subtotal.toFixed(2)}</td>
                    </tr>
                    <tr className="border-t border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800">
                      <td colSpan="4" className="p-3"></td>
                      <td className="p-3 text-right font-medium">Tax ({invoice.taxRate}%)</td>
                      <td className="p-3 text-right">${totals.tax.toFixed(2)}</td>
                    </tr>
                    {invoice.discount > 0 && (
                      <tr className="border-t border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800">
                        <td colSpan="4" className="p-3"></td>
                        <td className="p-3 text-right font-medium">Discount ({invoice.discount}%)</td>
                        <td className="p-3 text-right">-${totals.discount.toFixed(2)}</td>
                      </tr>
                    )}
                    <tr className="border-t border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 font-bold">
                      <td colSpan="4" className="p-3"></td>
                      <td className="p-3 text-right">Total</td>
                      <td className="p-3 text-right">${totals.total.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {invoice.notes && (
              <div className="mb-6">
                <h3 className="font-medium mb-2">Notes & Terms</h3>
                <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-lg">
                  <p>{invoice.notes}</p>
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <button
                type="button"
                onClick={shareViaEmail}
                className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                <MailIcon className="w-4 h-4 mr-2" />
                Share via Email
              </button>
              
              <button
                type="button"
                onClick={shareViaWhatsApp}
                className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
              >
                <ShareIcon className="w-4 h-4 mr-2" />
                Share via WhatsApp
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="flex items-center px-4 py-2 bg-surface-200 hover:bg-surface-300 dark:bg-surface-700 dark:hover:bg-surface-600 rounded-lg transition-colors"
              >
                <PrintIcon className="w-4 h-4 mr-2" />
                Print Invoice
              </button>
            </div>
          </motion.div>
        )}
        
        <div className={`mt-8 flex justify-between ${created ? 'hidden' : ''}`}>
          {currentStep > 0 ? (
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Previous
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigate('/invoices')}
              className="flex items-center px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Invoices
            </button>
          )}
          
          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
            >
              Next
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <button
              type="submit"
              className="flex items-center px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
            >
              <SaveIcon className="w-4 h-4 mr-2" />
              Create Invoice
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateInvoice;