/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";
import { useAxiosPublic } from "../hooks/useAxios";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loader, setLoader] = useState(true);
  const axiosPublic = useAxiosPublic();

  // Google provider
  const googleProvider = new GoogleAuthProvider();

  //   Register User
  const registerUser = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  //   Sign in User
  const signInUser = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   Goole sign in
  const googleSignIn = () => {
    setLoader(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signOutUser = async () => {
    setLoader(true);
    localStorage.removeItem("token");
    return signOut(auth);
  };

  //   On Auth State change
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const userInfo = { email: currentUser.email };
          const { data } = await axiosPublic.post("/auth/login", userInfo);

          if (data.token) {
            localStorage.setItem("token", data.token);
            setLoader(false);
          }
        } catch (error) {
          console.error(error?.response?.data?.message || error?.message);
          localStorage.removeItem("token");
          setLoader(false);
        }
      } else {
        localStorage.removeItem("token");
        setLoader(false);
      }
    });

    return () => unSubscribe();
  }, [axiosPublic]);

  const authInfo = {
    user,
    setUser,
    loader,
    setLoader,
    registerUser,
    signInUser,
    googleSignIn,
    signOutUser,
    updateUserProfile,
  };

  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
