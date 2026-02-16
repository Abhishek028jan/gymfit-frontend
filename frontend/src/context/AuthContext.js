import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        checkUserLoggedIn();
    }, []);

    // Check if user is logged in
    const checkUserLoggedIn = async () => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const res = await axios.get('http://localhost:5001/api/auth/me', config);

                setUser(res.data.data);
                setIsAuthenticated(true);
            } catch (err) {
                localStorage.removeItem('token');
                setUser(null);
                setIsAuthenticated(false);
            }
        }

        setLoading(false);
    };

    // Register user
    const register = async (userData) => {
        try {
            const res = await axios.post('http://localhost:5001/api/auth/register', userData);

            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
                setUser(res.data.user);
                setIsAuthenticated(true);
            }

            return { success: true, message: res.data.message };
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed');
            return { success: false, error: err.response?.data?.error || 'Registration failed' };
        }
    };

    // Login user
    const login = async (userData) => {
        try {
            const res = await axios.post('http://localhost:5001/api/auth/login', userData);

            localStorage.setItem('token', res.data.token);
            setUser(res.data.user);
            setIsAuthenticated(true);
            return { success: true };
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
            return { success: false, error: err.response?.data?.error || 'Login failed' };
        }
    };

    // Logout user
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
    };

    // Clear errors
    const clearErrors = () => setError(null);

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                loading,
                error,
                register,
                login,
                logout,
                clearErrors
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
