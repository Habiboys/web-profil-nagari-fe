/**
 * Get the full image URL from a path stored in the database
 * Database stores relative paths like: /uploads/media/image.jpg
 * This function prepends the backend URL from env
 * 
 * @param {string} imagePath - The image path from database
 * @returns {string} Full URL to the image
 */
export const getImageUrl = (imagePath) => {
    if (!imagePath) return '';

    // If already a full URL (starts with http), return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }

    // Get backend URL from env
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

    // Ensure path starts with /
    const path = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;

    return `${backendUrl}${path}`;
};

/**
 * Get the relative path from a full URL to store in database
 * Removes the backend URL prefix, leaving only the path
 * 
 * @param {string} fullUrl - The full URL including backend URL
 * @returns {string} Relative path to store in database
 */
export const getImagePath = (fullUrl) => {
    if (!fullUrl) return '';

    // If not a full URL, assume it's already a path
    if (!fullUrl.startsWith('http://') && !fullUrl.startsWith('https://')) {
        return fullUrl;
    }

    // Get backend URL from env
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

    // Remove the backend URL to get just the path
    if (fullUrl.startsWith(backendUrl)) {
        return fullUrl.replace(backendUrl, '');
    }

    // Try to extract path from any URL
    try {
        const url = new URL(fullUrl);
        return url.pathname;
    } catch {
        return fullUrl;
    }
};

export default { getImageUrl, getImagePath };
