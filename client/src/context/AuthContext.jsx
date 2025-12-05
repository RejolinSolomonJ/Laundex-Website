import { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'USER_LOADED':
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            };
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            };
        case 'AUTH_ERROR':
        case 'LOGIN_FAIL':
        case 'LOGOUT':
            localStorage.removeItem('token');
            localStorage.removeItem('user'); // Clear user data too
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Logout
    const logout = () => dispatch({ type: 'LOGOUT' });

    // Load User
    const loadUser = async () => {
        if (localStorage.token) {
            axios.defaults.headers.common['x-auth-token'] = localStorage.token;
        } else {
            delete axios.defaults.headers.common['x-auth-token'];
        }

        try {
            if (localStorage.token) {
                // Check if token is expired (basic check)
                const token = localStorage.token;
                try {
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    const isExpired = payload.exp * 1000 < Date.now();

                    if (isExpired) {
                        console.log('Token expired, logging out...');
                        logout();
                        return;
                    }
                } catch (e) {
                    console.error('Error decoding token:', e);
                    // If token is invalid, let the backend reject it or just logout
                }

                const user = JSON.parse(localStorage.getItem('user'));
                if (user) dispatch({ type: 'USER_LOADED', payload: user });
                else dispatch({ type: 'AUTH_ERROR' });
            }
        } catch (err) {
            dispatch({ type: 'AUTH_ERROR' });
        }
    };

    useEffect(() => {
        loadUser();

        // Axios Interceptor for 401 Unauthorized
        const interceptor = axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    // Only logout if the error is related to authentication/token
                    // We might want to be careful not to loop if the login endpoint itself returns 401
                    if (!error.config.url.includes('/login')) {
                        console.log('Session expired or unauthorized, logging out...');
                        logout();
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, []);

    // Login User
    const login = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('http://localhost:5002/api/auth/login', formData, config);

            localStorage.setItem('user', JSON.stringify(res.data.user)); // Store user info for persistence

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: 'LOGIN_FAIL',
                payload: err.response?.data?.msg || 'Login failed'
            });
            throw err; // Re-throw to handle in component
        }
    };

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
