import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext(null);

const formatUser = (user) => {
    if (!user) return null;

    const name = user.user_metadata?.full_name || user.email;

    return {
        id: user.id,
        email: user.email,
        name,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2563eb&color=fff`
    };
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSession = async () => {
            const { data } = await supabase.auth.getSession();

            if (data.session) {
                setUser(formatUser(data.session.user));
            } else {
                setUser(null);
            }

            setLoading(false);
        };

        getSession();

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(formatUser(session?.user));
            }
        );

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    const login = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            return {
                success: false,
                error: 'Invalid email or password'
            };
        }

        setUser(formatUser(data.user));

        return {
            success: true
        };
    };

    const register = async (name, email, password) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name
                }
            }
        });

        if (error) {
            return {
                success: false,
                error: error.message
            };
        }

        if (!data.session) {
            return {
                success: true,
                requiresEmailConfirmation: true
            };
        }

        setUser(formatUser(data.user));

        return {
            success: true,
            requiresEmailConfirmation: false
        };
    };

    const logout = async () => {
        await supabase.auth.signOut();
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


