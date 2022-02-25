import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  // User Relative Data
  const [userName, setUserName] = useState("");
  const [userWallet, setUserWallet] = useState(0);

  const handleLogout = (e) => {
    e.preventDefault();
    setLoggedIn(false);
    alert("Logged Out");
  };

  async function addusertoDB(name, email, id) {
    await setDoc(doc(db, "Users", id), {
      name: name,
      email: email,
      wallet: 0.0,
    });
  }

  async function signup(name, email, password) {
    // Our async function is important because this allows our data to update live rather than waiting to refresh.

    const ret3 = await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        let ret1 = userCredential.user.uid;
        addusertoDB(name, email, ret1);
        return 1;
      })
      .catch((error) => {
        console.log("Sign Up Error: ", error);
        return error;
      });
    return ret3;
  }

  async function login(email, password) {
    await signOut(auth);
    setLoggedIn(false);
    const ret2 = signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        let ret1 = userCredential.user.uid;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
    return ret2;
  }

  async function getUserData(id) {
    const info = onSnapshot(doc(db, "Users", id), (doc) => {
      console.log(doc.data());
      setUserName(doc.data().name);
      setUserWallet(doc.data().wallet);
    });
  }

  useEffect(() => {
    signOut(auth);
    setLoggedIn(false);
    setCurrentUser(null);
    onAuthStateChanged(auth, (user) => {
      console.log("User: ", user);
      if (user != null) {
        console.log("This One");
        setCurrentUser(user);
        setLoggedIn(true);
        getUserData(user.uid);
        setLoading(false);
      } else {
        console.log("check me");
        setLoading(false);
      }
    });
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    loggedIn,
    userName,
    userWallet,
    handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
