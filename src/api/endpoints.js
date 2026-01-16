const ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        ME: '/auth/me',
        PASSWORD: '/auth/password',
    },
    PROFILE: {
        GET: '/profile',
        UPDATE: (id) => `/profile/${id}`,
    },
    NEWS: {
        GET_ALL: '/news',
        GET_ONE: (id) => `/news/${id}`,
        CREATE: '/news',
        UPDATE: (id) => `/news/${id}`,
        DELETE: (id) => `/news/${id}`,
    },
    PRODUCTS: {
        GET_ALL: '/products',
        GET_ONE: (id) => `/products/${id}`,
        CREATE: '/products',
        UPDATE: (id) => `/products/${id}`,
        DELETE: (id) => `/products/${id}`,
    },
    OFFICIALS: {
        GET_ALL: '/officials',
        GET_ONE: (id) => `/officials/${id}`,
        CREATE: '/officials',
        UPDATE: (id) => `/officials/${id}`,
        DELETE: (id) => `/officials/${id}`,
    },
    TOURISM: {
        GET_ALL: '/tourism',
        GET_ONE: (id) => `/tourism/${id}`,
        CREATE: '/tourism',
        UPDATE: (id) => `/tourism/${id}`,
        DELETE: (id) => `/tourism/${id}`,
    },
    FACILITIES: {
        GET_ALL: '/facilities',
        CREATE: '/facilities',
        UPDATE: (id) => `/facilities/${id}`,
        DELETE: (id) => `/facilities/${id}`,
    },
    COMMODITIES: {
        GET_ALL: '/commodities',
        CREATE: '/commodities',
        UPDATE: (id) => `/commodities/${id}`,
        DELETE: (id) => `/commodities/${id}`,
    },
    GALLERY: {
        GET_ALL: '/gallery',
        CREATE: '/gallery',
        UPDATE: (id) => `/gallery/${id}`,
        DELETE: (id) => `/gallery/${id}`,
    },
    JORONGS: {
        GET_ALL: '/jorongs',
        CREATE: '/jorongs',
        UPDATE: (id) => `/jorongs/${id}`,
        DELETE: (id) => `/jorongs/${id}`,
    },
    MISSIONS: {
        GET_ALL: '/missions',
        CREATE: '/missions',
        UPDATE: (id) => `/missions/${id}`,
        DELETE: (id) => `/missions/${id}`,
    },
    ASSETS: {
        GET_ALL: '/assets',
        CREATE: '/assets',
        UPDATE: (id) => `/assets/${id}`,
        DELETE: (id) => `/assets/${id}`,
    },
    DEMOGRAPHICS: {
        GET: '/demographics',
        UPDATE: (id) => `/demographics/${id}`,
    },
    GEOGRAPHY: {
        GET: '/geography',
        UPDATE: (id) => `/geography/${id}`,
    },
    UPLOAD: {
        SINGLE: '/upload',
        MULTIPLE: '/upload/multiple',
        DELETE: (type, filename) => `/upload/${type}/${filename}`,
    },
};

export default ENDPOINTS;
