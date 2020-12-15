import React, { useContext, useState, useEffect } from 'react';
import firebase from 'firebase'
import { auth } from '../redux/index';

interface Value {
    currentUser: firebase.User
    signup:(email: string, password: string) => Promise<firebase.auth.UserCredential>
    login:(email: string, password: string) => Promise<firebase.auth.UserCredential>
    logout:() => Promise<void>
}

type Props= {
    children: JSX.Element
}

const AuthContext = React.createContext<Value | null>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<any>();
  const [loading, setLoading] = useState(true);

  const signup = (email:string, password:string) => auth.createUserWithEmailAndPassword(email, password);

  const login = (email:string, password:string) => auth.signInWithEmailAndPassword(email, password);

  const logout = () => auth.signOut();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value:Value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
