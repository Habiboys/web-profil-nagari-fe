import { useEffect, useState } from 'react';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';
import { getImageUrl } from '../utils/imageUrl';

const usePageHero = (pageName) => {
    const [hero, setHero] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const res = await api.get(ENDPOINTS.PAGE_HEROES.GET_ONE(pageName));
                const data = res.data;
                // Convert relative image path to full URL
                if (data && data.image) {
                    data.image = getImageUrl(data.image);
                }
                setHero(data);
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
