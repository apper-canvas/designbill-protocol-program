/**
 * Service for project operations
 */

/**
 * Get all projects
 * @param {Object} filters - Optional filters for the query
 * @returns {Promise} Promise that resolves to the project data
 */
export const getProjects = async (filters = {}) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      fields: ['Name', 'address', 'startDate', 'additionalInfo', 'client', 'Tags', 'Owner', 'CreatedOn'],
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
    
    // Filter by client if provided
    if (filters.clientId) {
      if (!params.where) params.where = [];
      params.where.push({
        fieldName: 'client',
        operator: 'ExactMatch',
        values: [filters.clientId]
      });
    }
    
    const response = await apperClient.fetchRecords('project', params);
    
    if (!response || !response.data) {
      return { success: false, error: 'No data returned from server' };
    }
    
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch projects'
    };
  }
};

/**
 * Get a project by ID
 * @param {string} projectId - ID of the project to fetch
 * @returns {Promise} Promise that resolves to the project data
 */
export const getProjectById = async (projectId) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      fields: ['Name', 'address', 'startDate', 'additionalInfo', 'client', 'Tags', 'Owner', 'CreatedOn']
    };
    
    const response = await apperClient.getRecordById('project', projectId, params);
    
    if (!response || !response.data) {
      return { success: false, error: 'Project not found' };
    }
    
    return { success: true, data: response.data };
  } catch (error) {
    console.error(`Error fetching project with ID ${projectId}:`, error);
    return {
      success: false,
      error: error.message || 'Failed to fetch project'
    };
  }
};

/**
 * Create a new project
 * @param {Object} projectData - Project data to create
 * @returns {Promise} Promise that resolves to the created project
 */
export const createProject = async (projectData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    // Only include updateable fields
    const params = {
      records: [{
        Name: projectData.name,
        address: projectData.address,
        startDate: projectData.startDate,
        additionalInfo: projectData.additionalInfo,
        client: projectData.clientId,
        Tags: projectData.tags
      }]
    };
    
    const response = await apperClient.createRecord('project', params);
    
    return { success: response.success, data: response.results[0]?.data };
  } catch (error) {
    console.error('Error creating project:', error);
    return { success: false, error: error.message || 'Failed to create project' };
  }
};