import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, onSnapshot, updateDoc, collection, query, where } from "firebase/firestore";
import { db } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  // User Related Data
  const [userName, setUserName] = useState("");
  const [userWallet, setUserWallet] = useState(0);
  const [userRole, setUserRole] = useState(-1);
  const [userId, setUserId] = useState("");
  const [orderIds, setOrderIds] = useState([]);


  // Manager related Data
  const [getUsers, setGetUsers] = useState([]);

  async function handleLogout() {
    setLoggedIn(false);
    setCurrentUser(null);
    setUserRole(-1);
    setGetUsers([]);
    await signOut(auth);
  };

  async function getNewUser() {
    console.log("getNewUser");
    const q = await query(collection(db, "Users"), where("role", "==", 0));
    onSnapshot(q, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
        cities.push(doc.data());
      });
      setGetUsers(cities);
      console.log(cities);
    });
  }

  async function updateRole(id, role) {
    await updateDoc(doc(db, "Users", id), {
      role: role,
    });
  }

  async function addusertoDB(name, email, id) {
    var temp = id;
    await handleLogout();
    await setDoc(doc(db, "Users", temp), {
      name: name,
      email: email,
      wallet: 0.0,
      role: 0,
      id: id
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

  async function addToOrder() {
    console.log("addToOrder");
  }

  async function login(email, password) {
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
    const info = await onSnapshot(doc(db, "Users", id), (doc) => {
      setUserRole(doc.data().role);
      setUserName(doc.data().name);
      setUserWallet(doc.data().wallet);
      setUserId(doc.data().id);
      if (doc.data().role === 0) {
        handleLogout();
        alert("You are not authorized to access this page");
        info();
      } else if (doc.data().role === 1001) {
        getNewUser();
      }
    });
  }

  async function addToOrder(document) {
    const newCityRef = doc(collection(db, "Orders"));
    document.userId = userId;
    await setDoc(newCityRef, document);
    var temp = orderIds;
    temp.push(newCityRef.id);
    setOrderIds(temp);
    await updateDoc(doc(db, "Users", userId), {
      orders: orderIds
    });
  }

  useEffect(() => {
    handleLogout();
    onAuthStateChanged(auth, (user) => {
      console.log("User: ", user);
      if (user != null) {
        setCurrentUser(user);
        setLoggedIn(true);
        getUserData(user.uid);
        setLoading(false);
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    });
  }, []);

  const value = {
    updateRole, 
    currentUser,
    login,
    signup,
    loggedIn,
    userName,
    userWallet,
    handleLogout,
    userRole,
    getUsers,
    addToOrder
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
