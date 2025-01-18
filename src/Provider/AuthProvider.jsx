import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loader, setLoader] = useState(true);

  // Google provider
  const googleProvider = new GoogleAuthProvider();

  //   On Auth State change
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoader(false);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  //   Register User
  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   Sign in User
  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   Goole sign in
  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const signOutUser = () => {
    return signOut(auth);
  };

  const authInfo = {
    user,
    setUser,
    loader,
    setLoader,
    registerUser,
    signInUser,
    googleSignIn,
    signOutUser,
  };

  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
