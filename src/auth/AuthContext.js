import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USER } from '../data/mockData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check localStorage for mock auth token
        const token = localStorage.getItem('jobtrack_auth_token');
        if (token) {
            setUser(MOCK_USER);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 800));

        if (email && password) {
            localStorage.setItem('jobtrack_auth_token', 'mock_token_123');
            setUser(MOCK_USER);
            setLoading(false);
            return { success: true };
        }
        setLoading(false);
        return { success: false, error: 'Invalid credentials' };
    };

    const register = async (name, email, password) => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));

        if (name && email && password) {
            localStorage.setItem('jobtrack_auth_token', 'mock_token_123');
            setUser({ ...MOCK_USER, name, email });
            setLoading(false);
            return { success: true };
        }
        setLoading(false);
        return { success: false, error: 'All fields are required' };
    };

    const logout = () => {
        localStorage.removeItem('jobtrack_auth_token');
        setUser(null);
    };

    const value = {
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
