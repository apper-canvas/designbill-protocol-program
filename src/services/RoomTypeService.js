/**
 * Service for room type operations
 */

/**
 * Get all room types
 * @returns {Promise} Promise that resolves to the room type data
 */
export const getRoomTypes = async () => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      fields: ['Name', 'icon', 'description', 'Tags'],
      orderBy: [
        {
          fieldName: 'Name',
          SortType: 'ASC'
        }
      ]
    };
    
    const response = await apperClient.fetchRecords('room_type', params);
    
    if (!response || !response.data) {
      return { success: false, error: 'No data returned from server' };
    }
    
    // Format the data to match the expected structure in the app
    const formattedData = response.data.map(room => ({
      id: room.Id,
      name: room.Name,
      icon: room.icon || 'layout',
      description: room.description
    }));
    
    // Add custom room type
    formattedData.push({
      id: 'custom',
      name: 'Custom Area',
      icon: 'layout',
      description: 'Specify your own custom area'
    });
    
    return { success: true, data: formattedData };
  } catch (error) {
    console.error('Error fetching room types:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to fetch room types',
      // Return fallback data
      data: [
        {
          id: 'master-bedroom',
          name: 'Master Bedroom',
          icon: 'bed',
          description: 'Primary bedroom in the house'
        },
        {
          id: 'bedroom',
          name: 'Bedroom',
          icon: 'bed',
          description: 'Secondary bedrooms in the house'
        },
        {
          id: 'kitchen',
          name: 'Kitchen',
          icon: 'utensils',
          description: 'Kitchen area including counters and cabinets'
        },
        {
          id: 'living-room',
          name: 'Living Room',
          icon: 'sofa',
          description: 'Main living area for family and guests'
        },
        {
          id: 'bathroom',
          name: 'Bathroom',
          icon: 'shower',
          description: 'Bathroom including fixtures and fittings'
        },
        {
          id: 'dining-room',
          name: 'Dining Room',
          icon: 'coffee',
          description: 'Formal dining area'
        },
        {
          id: 'custom',
          name: 'Custom Area',
          icon: 'layout',
          description: 'Specify your own custom area'
        }
      ]
    };
  }
};