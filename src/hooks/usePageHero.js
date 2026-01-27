import { useEffect, useState } from 'react';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';

const usePageHero = (pageName) => {
    const [hero, setHero] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const res = await api.get(ENDPOINTS.PAGE_HEROES.GET_ONE(pageName));
                setHero(res.data);
            } catch (error) {
                console.log(`No hero found for ${pageName}`);
            } finally {
                setLoading(false);
            }
        };
        if (pageName) {
            fetchHero();
        }
    }, [pageName]);

    return { hero, loading };
};

export default usePageHero;
