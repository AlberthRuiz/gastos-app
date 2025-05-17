import { useState, useEffect } from 'react';
import { User as FirebaseUser } from 'firebase/auth';

// Extend the Window interface to include gapi
declare global {
  interface Window {
    gapi?: any;
  }
}
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { User } from '../types/user';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email!,
          displayName: firebaseUser.displayName,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = async (email: string, password: string, displayName: string) => {
    try {
      setError(null);
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
      
      await updateProfile(firebaseUser, { displayName });
      
      setUser({
        id: firebaseUser.uid,
        email: firebaseUser.email!,
        displayName,
      });
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password);
      setUser({
        id: firebaseUser.uid,
        email: firebaseUser.email!,
        displayName: firebaseUser.displayName,
      });
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const loginWithGoogle = async () => {
    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      const { user: firebaseUser } = await signInWithPopup(auth, provider);
      
      setUser({
        id: firebaseUser.uid,
        email: firebaseUser.email!,
        displayName: firebaseUser.displayName,
      });
      
      return firebaseUser;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      // Sign out from Firebase Auth
      await signOut(auth);

      // Also sign out from Google if user is signed in with Google
      if (window.gapi && window.gapi.auth2) {
        const auth2 = window.gapi.auth2.getAuthInstance();
        if (auth2 && auth2.isSignedIn.get()) {
          await auth2.signOut();
        }
      }

      setUser(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return { user, loading, error, register, login, loginWithGoogle, logout };
};
