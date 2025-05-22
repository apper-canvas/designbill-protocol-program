/**
 * Service for client operations
 */

/**
 * Get all clients
 * @param {Object} filters - Optional filters for the query
 * @returns {Promise} Promise that resolves to the client data
 */
export const getClients = async (filters = {}) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      fields: ['Name', 'email', 'phone', 'address', 'Tags', 'Owner', 'CreatedOn'],
      orderBy: [
        {
          fieldName: 'Name',
          SortType: 'ASC'
        }
      ]
    };
    
    // Add filters if provided
    if (filters.search) {
      params.where = [
        {
          fieldName: 'Name',
          operator: 'Contains',
          values: [filters.search]
        }
      ];
    }
    
    const response = await apperClient.fetchRecords('client', params);
    
    if (!response || !response.data) {
      return { success: false, error: 'No data returned from server' };
    }
    
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error fetching clients:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch clients'
    };
  }
};

/**
 * Get a client by ID
 * @param {string} clientId - ID of the client to fetch
 * @returns {Promise} Promise that resolves to the client data
 */
export const getClientById = async (clientId) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      fields: ['Name', 'email', 'phone', 'address', 'Tags', 'Owner', 'CreatedOn']
    };
    
    const response = await apperClient.getRecordById('client', clientId, params);
    
    if (!response || !response.data) {
      return { success: false, error: 'Client not found' };
    }
    
    return { success: true, data: response.data };
  } catch (error) {
    console.error(`Error fetching client with ID ${clientId}:`, error);
    return {
      success: false,
      error: error.message || 'Failed to fetch client'
    };
  }
};

/**
 * Create a new client
 * @param {Object} clientData - Client data to create
 * @returns {Promise} Promise that resolves to the created client
 */
export const createClient = async (clientData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    // Only include updateable fields
    const params = {
      records: [{
        Name: clientData.name,
        email: clientData.email,
        phone: clientData.phone,
        address: clientData.address,
        Tags: clientData.tags
      }]
    };
    
    const response = await apperClient.createRecord('client', params);
    
    if (!response || !response.success) {
      return { success: false, error: 'Failed to create client' };
    }
    
    return { success: true, data: response.results[0].data };
  } catch (error) {
    console.error('Error creating client:', error);
    return { success: false, error: error.message || 'Failed to create client' };
  }
};