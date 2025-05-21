import { useState } from 'react';
import { getIcon } from '../utils/iconUtils';
import { toast } from 'react-toastify';

const Settings = () => {
  // Initial state for form values
  const [formValues, setFormValues] = useState({
    companyName: 'DesignBill Demo',
    ownerName: 'Jane Smith',
    email: 'jane@designbill.com',
    phone: '(555) 123-4567',
    address: '123 Design Street, Suite 100',
    city: 'San Francisco',
    state: 'CA',
    zip: '94103',
    country: 'United States',
    currency: 'USD',
    taxRate: '8.5',
    invoicePrefix: 'INV-',
    invoiceFooter: 'Thank you for your business!'
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Settings saved successfully!');
  };

  // Get icons
  const SaveIcon = getIcon('save');

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-surface-600 dark:text-surface-400 mt-2">
          Manage your company information and application preferences
        </p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <h3 className="text-xl font-semibold mb-6">Company Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label htmlFor="companyName" className="form-label">Company Name</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formValues.companyName}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            
            <div>
              <label htmlFor="ownerName" className="form-label">Owner/Manager Name</label>
              <input
                type="text"
                id="ownerName"
                name="ownerName"
                value={formValues.ownerName}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div>
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formValues.phone}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-6">Invoice Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label htmlFor="currency" className="form-label">Default Currency</label>
              <select
                id="currency"
                name="currency"
                value={formValues.currency}
                onChange={handleChange}
                className="form-input"
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="CAD">CAD - Canadian Dollar</option>
                <option value="AUD">AUD - Australian Dollar</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="taxRate" className="form-label">Default Tax Rate (%)</label>
              <input
                type="text"
                id="taxRate"
                name="taxRate"
                value={formValues.taxRate}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            
            <div>
              <label htmlFor="invoicePrefix" className="form-label">Invoice Number Prefix</label>
              <input
                type="text"
                id="invoicePrefix"
                name="invoicePrefix"
                value={formValues.invoicePrefix}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="invoiceFooter" className="form-label">Default Invoice Footer</label>
            <textarea
              id="invoiceFooter"
              name="invoiceFooter"
              value={formValues.invoiceFooter}
              onChange={handleChange}
              rows="3"
              className="form-input"
            ></textarea>
          </div>
          
          <div className="flex justify-end">
            <button type="submit" className="btn btn-primary flex items-center">
              <SaveIcon className="w-5 h-5 mr-2" />
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Settings;