'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import {
    onAuthStateChanged,
    signInWithPopup,
    signOut as firebaseSignOut,
} from 'firebase/auth';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState(null);
    const [googleProvider, setGoogleProvider] = useState(null);

    useEffect(() => {
        // Dynamically import firebase on client side only
        const initAuth = async () => {
            const { auth: firebaseAuth, googleProvider: provider } = await import('./firebase');
            setAuth(firebaseAuth);
            setGoogleProvider(provider);

            if (firebaseAuth) {
                const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
                    setUser(user);
                    setLoading(false);
                });
                return () => unsubscribe();
            } else {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    const signInWithGoogle = async () => {
        if (!auth || !googleProvider) {
            const errorMsg = 'Firebase not initialized. Check your .env.local file.';
            console.error(errorMsg);
            alert(errorMsg);
            return;
        }
        try {
            const result = await signInWithPopup(auth, googleProvider);
            return result.user;
        } catch (error) {
            console.error('Error signing in with Google:', error);
            if (error.code === 'auth/unauthorized-domain') {
                const domain = window.location.hostname;
                alert(`Domain not authorized: ${domain}. Please add this domain to Firebase Console -> Authentication -> Settings -> Authorized Domains.`);
            }
            throw error;
        }
    };

    const signOut = async () => {
        if (!auth) {
            console.error('Firebase not initialized');
            return;
        }
        try {
            await firebaseSignOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
            throw error;
        }
    };

    const value = {
        user,
        loading,
        signInWithGoogle,
        signOut,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
