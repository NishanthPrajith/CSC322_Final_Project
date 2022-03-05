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
import { type } from "@testing-library/user-event/dist/type";

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
  const [userWarnings, setUserWarning] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);

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
      warning: 0,
      totalSpent: 0,
      countOrders: 0,
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
        return error;
      });
    return ret3;
  }

  async function login(email, password) {
    const ret2 = signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        let ret1 = userCredential.user.uid;
      })
      .catch((error) => {
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
      setTotalSpent(doc.data().totalSpent);
      setOrderId(doc.data().orders);
      setUserWarning(doc.data().warnings);
      console.log(doc.data().orders);
      getOrders(doc.data().orders);
      if (doc.data().role === 0) {
        handleLogout();
        alert("You are not authorized to access this page");
        info();
      } else if (doc.data().role === 1001) {
        getNewUser();
      } else if (doc.data().role === -111) {
        handleLogout();
        alert("You have been Banned from the system");
        info();
      }
    });
  }

  async function accountStatusChange(state) {
    if (state == 1) {
      await updateDoc(doc(db, "Users", userId), {
        role: 111,
        warnings: 0,
      });
    } else if (state === 2 && userRole === 111) {
      await updateDoc(doc(db, "Users", userId), {
        role: 11,
        warnings: 0,
      });
    } else if (state === 2 && userRole === 11) {
      alert("You have been removed from the system");
      alert("$" + userWallet + " has been refunded to your account");
      await updateDoc(doc(db, "Users", userId), {
        role: -111,
        warnings: 0,
      });
    }
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
    temp.push(newCityRef.id);
    await updateWallet(document.totalPrice, "subtract");
    var b = (totalSpent + parseFloat(document.totalPrice)).toFixed(2);
    if (b > 100 && userRole === 11) {
      await accountStatusChange(1);
    }
    if (temp.length === 5 && userRole === 11) {
      await accountStatusChange(1);
    }
    await updateDoc(doc(db, "Users", userId), {
      orders: temp,
      totalSpent: parseFloat(b)
    });
  }

  async function getOrders(ord) {
    console.log(ord);
    if (ord !== []) {
      console.log("check");
      const q = query(collection(db, "Orders"), where("orderId", "in", ord));
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.unshift(doc.data());      
      });
      setOrders(data);
      console.log(orders);
    }
  }

  async function AddWarning(id) {
    await updateDoc(doc(db, "Users", id), {
      warnings: userWarnings + 1
    });
    if (userWarnings + 1 === 2 && userRole === 111) {
      await accountStatusChange(2);
    } else if (userWarnings + 1 === 3 && userRole === 11) {
      await accountStatusChange(2);
    }
    setUserWarning(userWarnings + 1);
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

  async function updateWallet(amount, type) {
    if (type === "add") {
      var a = parseInt(amount);
      console.log(typeof userWallet);
      await updateDoc(doc(db, "Users", userId), {
        wallet: userWallet + a
      });
      setUserWallet(userWallet + a);
    } else if (type === "subtract") {
      var a = (userWallet - parseFloat(amount)).toFixed(2);
      console.log("final  ", a);
      await updateDoc(doc(db, "Users", userId), {
        wallet: parseFloat(a)
      });
      setUserWallet(a);
    }
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
    userId,
    handleLogout,
    userRole,
    getUsers,
    addToOrder,
    orders,
    writeOrderReviewUser,
    updateWallet,
    userWarnings,
    AddWarning,
    orderId
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
