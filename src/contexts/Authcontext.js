import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, onSnapshot, updateDoc, getDocs, collection, query, where } from "firebase/firestore";
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
  const [userJoined, setUserJoined] = useState(0);
  const [userRole, setUserRole] = useState(-1);
  const [userId, setUserId] = useState("");
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState([]);


  // Manager related Data
  const [getUsers, setGetUsers] = useState([]);

  async function handleLogout() {
    setLoggedIn(false);
    setCurrentUser(null);
    setUserRole(-1);
    setGetUsers([]);
    setOrderId([]);
    setOrders([]);
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
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    await handleLogout();
    await setDoc(doc(db, "Users", temp), {
      name: name,
      email: email,
      wallet: 0.0,
      role: 0,
      id: id,
      joined: date,
      orders: [],
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
      setUserJoined(doc.data().joined);
      setUserId(doc.data().id);
      setOrderId(doc.data().orders);
      console.log(doc.data().orders);
      getOrders(doc.data().orders);
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
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const newCityRef = doc(collection(db, "Orders"));
    document.userId = userId;
    document.orderId = newCityRef.id;
    document.orderDate = date;
    await setDoc(newCityRef, document);
    var temp = orderId;
    console.log("check: ", orderId);
    temp.push(newCityRef.id);
    await updateDoc(doc(db, "Users", userId), {
      orders: temp
    });
  }

  async function getOrders(ord) {
    const q = query(collection(db, "Orders"), where("orderId", "in", ord));
    const querySnapshot = await getDocs(q);
    const data = [];
    console.log(data);
    querySnapshot.forEach((doc) => {
      data.unshift(doc.data());      
    });
    setOrders(data);
    console.log(orders);
  }

  async function writeOrderReviewUser(id, rating, chef, delivery) {
    const orders = doc(db, "Orders", id);
    console.log(orders);
    await updateDoc(orders, {
      rating: rating,
      chefReview: chef,
      deliveryReview: delivery,
      reviewed: true
    });
    await getOrders(orderId);

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
    userJoined,
    handleLogout,
    userRole,
    getUsers,
    addToOrder,
    orders,
    writeOrderReviewUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
