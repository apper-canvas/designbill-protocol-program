/**
 * Service for catalog item operations
 */

/**
 * Get catalog items for a specific room type
 * @param {string} roomTypeId - ID of the room type
 * @returns {Promise} Promise that resolves to the catalog items
 */
export const getCatalogItemsByRoomType = async (roomTypeId) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      fields: ['Name', 'defaultMeasurement', 'defaultRate', 'roomType'],
      where: [
        {
          fieldName: 'roomType',
          operator: 'ExactMatch',
          values: [roomTypeId]
        }
      ]
    };
    
    const response = await apperClient.fetchRecords('catalog_item', params);
    
    if (!response || !response.data) {
      throw new Error('No data returned from server');
    }
    
    // Format the data to match the expected structure
    const formattedData = response.data.map(item => ({
      id: item.Id,
      name: item.Name,
      defaultMeasurement: item.defaultMeasurement || 'per unit',
      defaultRate: parseFloat(item.defaultRate) || 0,
      pricingOptions: ['per unit', 'per sq ft', 'per running ft', 'per window', 'per piece', 'per set', 'custom quote']
    }));
    
    return { success: true, data: formattedData };
  } catch (error) {
    console.error(`Error fetching catalog items for room type ${roomTypeId}:`, error);
    
    // Fallback to local data for specific room types
    const fallbackData = getFallbackRoomItems(roomTypeId);
    
    return { 
      success: false, 
      error: error.message || 'Failed to fetch catalog items',
      data: fallbackData // Return fallback data
    };
  }
};

/**
 * Get fallback room items when API fails
 * @param {string} roomTypeId - ID of the room type
 * @returns {Array} Array of fallback room items
 */
function getFallbackRoomItems(roomTypeId) {
  // Import from local data
  const roomItems = {
    'master-bedroom': [
      {
        id: 'mb-bed',
        name: 'King Size Bed',
        defaultMeasurement: 'per unit',
        defaultRate: 1500,
        pricingOptions: ['per unit', 'custom quote']
      },
      {
        id: 'mb-wardrobe',
        name: 'Custom Walk-in Wardrobe',
        defaultMeasurement: 'per sq ft',
        defaultRate: 85,
        pricingOptions: ['per sq ft', 'custom quote']
      }
    ],
    'bedroom': [
      {
        id: 'b-bed',
        name: 'Queen Size Bed',
        defaultMeasurement: 'per unit',
        defaultRate: 1200,
        pricingOptions: ['per unit', 'custom quote']
      }
    ]
  };
  
  // Return the items for the specified room type or an empty array
  return roomItems[roomTypeId] || [];
}