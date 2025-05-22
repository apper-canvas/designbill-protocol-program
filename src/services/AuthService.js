/**
 * Service for authentication operations
 */

/**
 * Get the current authenticated user
 * @returns {Object} Current user or null
 */
export const getCurrentUser = () => {
  const { ApperUI } = window.ApperSDK;
  return ApperUI.getUser();
};

/**
 * Check if user is authenticated
 * @returns {boolean} Whether user is authenticated
 */
export const isAuthenticated = () => {
  const { ApperUI } = window.ApperSDK;
  return !!ApperUI.getUser();
};

/**
 * Logout the current user
 * @returns {Promise} Promise that resolves when logout is complete
 */
export const logout = async () => {
  try {
    const { ApperUI } = window.ApperSDK;
    await ApperUI.logout();
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return {
      success: false, error: error.message || 'Failed to logout'
    };
  }
};