const BASE_API_URL = '/api';

export const API_URL = `http://localhost:${process.env.PORT || 3005}/api`;

// Auth Routes
export const LOGIN_API_URL = `${BASE_API_URL}/auth/login`;
export const LOGOUT_API_URL = `${BASE_API_URL}/auth/logout`;
export const SIGNUP_API_URL = `${BASE_API_URL}/auth/signup`;
export const WHO_AM_I_API_URL = `${BASE_API_URL}/auth/whoami`;

// Product ROutes
export const PRODUCTS_API_URL = `${BASE_API_URL}/products`;
export const UPLOADED_PRODUCTS_API_URL = `${BASE_API_URL}/products/uploads`;

export const PROVIDERS_API_URL = `${BASE_API_URL}/providers`;
