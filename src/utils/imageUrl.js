// Backend base URL for static files (images, uploads, etc)
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

/**
 * Get full image URL from a path
 * @param {string} path - Image path (e.g. '/uploads/media/image.jpg')
 * @returns {string} Full URL (e.g. 'http://localhost:5000/uploads/media/image.jpg')
 */
export const getImageUrl = (path) => {
    if (!path) return '';

    // If already a full URL (http/https), return as-is
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }

    // If starts with /, combine with backend URL
    if (path.startsWith('/')) {
        return `${BACKEND_URL}${path}`;
    }

    // Otherwise, assume it needs /uploads prefix
    return `${BACKEND_URL}/${path}`;
};

/**
 * Get backend URL constant
 */
export const BACKEND_BASE_URL = BACKEND_URL;

export default { getImageUrl, BACKEND_BASE_URL };
