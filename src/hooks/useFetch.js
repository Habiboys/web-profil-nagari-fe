import { useCallback, useEffect, useState } from 'react';
import api from '../api/axios';

/**
 * Custom hook for fetching data from an API endpoint.
 * @param {string} url - The API endpoint URL.
 * @param {object} options - Optional configuration for the request (e.g., method, body, headers).
 * @param {boolean} manual - If true, the request is not executed immediately (useful for submitting forms).
 * @returns {object} - { data, loading, error, execute }
 */
const useFetch = (url, options = {}, manual = false) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(!manual);
    const [error, setError] = useState(null);

    const execute = useCallback(async (overrideOptions = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api({
                url,
                ...options,
                ...overrideOptions,
            });
            setData(response.data);
            return response.data;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [url, options]);

    useEffect(() => {
        if (!manual) {
            execute();
        }
    }, [execute, manual]);

    return { data, loading, error, execute };
};

export default useFetch;
