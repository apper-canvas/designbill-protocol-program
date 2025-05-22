/**
 * Service for invoice operations
 */

/**
 * Get all invoices
 * @param {Object} filters - Optional filters for the query
 * @returns {Promise} Promise that resolves to the invoice data
 */
export const getInvoices = async (filters = {}) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      fields: [
        'Name', 'invoiceNumber', 'issueDate', 'dueDate', 
        'taxRate', 'discount', 'notes', 'status', 
        'client', 'project', 'Tags'
      ],
      orderBy: [
        {
          fieldName: 'issueDate',
          SortType: 'DESC'
        }
      ]
    };
    
    // Add filters if provided
    if (filters.status) {
      params.where = [
        {
          fieldName: 'status',
          operator: 'ExactMatch',
          values: [filters.status]
        }
      ];
    }
    
    if (filters.search) {
      if (!params.where) params.where = [];
      params.where.push({
        fieldName: 'invoiceNumber',
        operator: 'Contains',
        values: [filters.search]
      });
    }
    
    const response = await apperClient.fetchRecords('invoice', params);
    
    if (!response || !response.data) {
      return { success: false, error: 'No data returned from server' };
    }
    
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch invoices'
    };
  }
};

/**
 * Get an invoice by ID
 * @param {string} invoiceId - ID of the invoice to fetch
 * @returns {Promise} Promise that resolves to the invoice data
 */
export const getInvoiceById = async (invoiceId) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      fields: [
        'Name', 'invoiceNumber', 'issueDate', 'dueDate', 
        'taxRate', 'discount', 'notes', 'status', 
        'client', 'project', 'Tags'
      ]
    };
    
    const response = await apperClient.getRecordById('invoice', invoiceId, params);
    
    if (!response || !response.data) {
      return { success: false, error: 'Invoice not found' };
    }
    
    return { success: true, data: response.data };
  } catch (error) {
    console.error(`Error fetching invoice with ID ${invoiceId}:`, error);
    return {
      success: false,
      error: error.message || 'Failed to fetch invoice'
    };
  }
};

/**
 * Create a new invoice
 * @param {Object} invoiceData - Invoice data to create
 * @returns {Promise} Promise that resolves to the created invoice
 */
export const createInvoice = async (invoiceData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    // Only include updateable fields
    const params = {
      records: [{
        Name: invoiceData.Name || `Invoice ${invoiceData.invoiceNumber}`,
        invoiceNumber: invoiceData.invoiceNumber,
        issueDate: invoiceData.issueDate,
        dueDate: invoiceData.dueDate,
        taxRate: invoiceData.taxRate,
        discount: invoiceData.discount,
        notes: invoiceData.notes,
        status: invoiceData.status || 'Pending',
        client: invoiceData.clientId,
        project: invoiceData.projectId
      }]
    };
    
    const response = await apperClient.createRecord('invoice', params);
    
    return { success: response.success, data: response.results[0]?.data };
  } catch (error) {
    console.error('Error creating invoice:', error);
    return { success: false, error: error.message || 'Failed to create invoice' };
  }
};