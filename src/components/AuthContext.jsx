import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { 
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Sign up function
  async function signup(email, password) {
    try {
      setError('');
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user document in Firestore
      const { createUserDocument } = await import('../firebase');
      await createUserDocument(result.user);
      
      return { success: true, user: result.user };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }

  // Login function
  async function login(email, password) {
    try {
      setError('');
      const result = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: result.user };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }

  // Google login function
  async function loginWithGoogle() {
    try {
      setError('');
      const result = await signInWithPopup(auth, googleProvider);
      
      // Create user document in Firestore (doesn't overwrite if exists)
      const { createUserDocument } = await import('../firebase');
      await createUserDocument(result.user);
      
      return { success: true, user: result.user };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }

  // Logout function
  async function logout() {
    try {
      setError('');
      await signOut(auth);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    loginWithGoogle,
    logout,
    signup,
    error,
    setError,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
