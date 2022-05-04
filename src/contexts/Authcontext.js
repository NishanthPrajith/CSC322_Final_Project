import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, onSnapshot, addDoc, deleteDoc, getDoc, updateDoc, getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useFood } from "./foodContext";

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

  const [recommendedOrders, setRecommendedOrders] = useState([]);

  // Delivery Related Data
  const [deliveryOrders, setDeliveryOrders] = useState([]);
  const [myOrders, setMyOrders] = useState([]);

  // Manager related Data
  const [getUsers, setGetUsers] = useState([]);
  const [getQuitUsers, setGetQuitUsers] = useState([]);
  const [getBannedUsers, setGetBannedUsers] = useState([]);

  async function handleLogout() {
    await signOut(auth);
    setLoggedIn(false);
    setCurrentUser(null);
    setUserRole(-1);
    setGetUsers([]);
    setRecommendedOrders([]);
    setGetQuitUsers([]);
    setGetBannedUsers([]);
    setOrderId([]);
    setOrders([]);
    setMyOrders([]);
    setDeliveryOrders([]);
    setUserName("");
    setUserId("");
    setUserWallet(0);
    setUserJoined(0);
    setUserWarning(0);
    setTotalSpent(0);
  };

  async function getUserAccounts() {
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
    console.log("get quit users");
    const g = await query(collection(db, "Users"), where("role", "==", -1111));
    onSnapshot(g, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
        cities.push(doc.data());
      });
      setGetQuitUsers(cities);
      console.log(cities);
    });
    console.log("get banned users");
    const h = await query(collection(db, "Users"), where("role", "==", -111));
    onSnapshot(h, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
        cities.push(doc.data());
      });
      setGetBannedUsers(cities);
    });
  }

  async function updateRole(id, role) {
    await updateDoc(doc(db, "Users", id), {
      role: role,
      wallet: 0,
      warnings: 0,
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
      warnings: 0,
      totalSpent: 0,
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
      getOrders(doc.data().orders);
      console.log("Role : " + doc.data().role);
      setLoggedIn(true);
      if (doc.data().role === 0) {
        handleLogout();
        alert("You are not authorized to access this page");
        info();
      } else if (doc.data().role === 1001) {
        getUserAccounts();
        getDeliveryOrders("manager");
      } else if (doc.data().role === -11111) {
        info();
        handleLogout();
        alert("You have been permantly banned from the system and the money you had in your wallet has been returned to you");
      } else if (doc.data().role === -111) {
        handleLogout();
        alert("You have been banned from the system, the manager has been notified");
        info();
      } else if (doc.data().role === -1111) {
        handleLogout();
        alert("Your account is still being deleted");
        info();
      } else if (doc.data().role === 33) {
        getDeliveryOrders("delivery");
        getMyOrders(doc.data().id);
        console.log(deliveryOrders);
      }
    });
  }

  async function deleteAccount(id) {
    await deleteDoc(doc(db, "Users", id));
  }

  async function setDeliveryPerson(orderId, chosenId, secondId, memo) {
    await updateDoc(doc(db, "Orders", orderId), {
      deliveryUserId: chosenId,
    });
    if (memo !== "") {
      await updateDoc(doc(db, "Orders", orderId), {
        memo: memo,
      });
    }
    await updateDoc(doc(db, "Users", chosenId), {
      countOrders: 0
    });

    const docRef = doc(db, "Users", secondId);
    const docSnap = await getDoc(docRef);
    const count = docSnap.data().countOrders;
    if (count % 5 === 4 && count !== 0) {
      await updateDoc(doc(db, "Users", secondId), {
        countOrders: 0,
        warnings: docSnap.data().warnings + 1
      });
    } else {
      await updateDoc(doc(db, "Users", secondId), {
        countOrders: count + 1
      });
    }
  }

  async function getDeliveryOrders(a) {
    console.log("running getDeliveryOrders");
    const food = collection(db, "Orders");
    const v = await onSnapshot(food, (querySnapshot) => {
        const data = [];
        const a = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().orderStatus === true) {
            data.push(doc.data());
          }
        });
        console.log("delivery Info", data);
        setDeliveryOrders(data);
        if (!loggedIn) {
          v();
        }
        if (a === "manager") {
          v();
        }
      });
  }

  async function getMyOrders(id) {
    const food = collection(db, "Orders");
    const v = await onSnapshot(food, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().deliveryUserId === id) {
            console.log("made a push");
            console.log("userId here is ", id)
            data.push(doc.data());
          }
        });
        setMyOrders(data);
        v();
      });
  }

  async function orderDelivered(id, bid) {
    await updateDoc(doc(db, "Orders", id), {
      orderStatus: false,
    });
    await updateDoc(doc(db, "Users", userId), {
      wallet: userWallet + 1,
      totalSpent: totalSpent + parseFloat(bid), 
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
      alert("You have received too many warnings and manager will decide to delete you from the system");
      await updateDoc(doc(db, "Users", userId), {
        role: -111,
      });
    }
  }

  async function quitAccount() {
    alert("Thank you so much! Your account will be deleted and the money refunded to your account");
    alert(userId);
    await updateDoc(doc(db, "Users", userId), {
      role: -1111,
    });
    handleLogout();
  }

  async function addToOrder(document) {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const newCityRef = doc(collection(db, "Orders"));
    document.userId = userId;
    document.orderId = newCityRef.id;
    document.orderDate = date;
    document.userReviewed = false;
    if (document.state === 2) {
      document.bids = {}
      document.deliveryUserId = "";
    }
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
    if (ord.length !== 0) {
      console.log("check");
      const q = collection(db, "Orders");
      var data = [];
      var hello = [];
      const v = await onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (ord.includes(doc.data().orderId)) {
            data.unshift(doc.data());
            for (var i = 0; i < doc.data().order.length; i++) {
              var check = true;
              for (var j = 0; j < hello.length; j++) {
                if (hello[j] === doc.data().order[i].name) {
                  check = false;
                  break;
                }
              }
              if (hello.length != 3 && check) {
                hello.push(doc.data().order[i].name);
              }
            }
            console.log("recommend : ", hello);
          }
        });
        setRecommendedOrders(hello);
        setOrders(data);
        data = [];
      });
    }
  }

  async function submitOrderBid(bidValue, orderid, v) {
    const q = doc(db, "Orders", orderid);
    v[userId] = parseFloat(bidValue);
    await updateDoc(q, {
      bids: v
    });
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

  async function submitDishReview(info, orderId) {
    for (var i = 0; i < info.length; i++) {
      const newCityRef = doc(collection(db, "Reviews"));
      // later...
      await setDoc(newCityRef, info[i]);
    }
    updateDoc(doc(db, "Orders", orderId), {
      userReviewed: true
    });
  }

  async function submitDeliveryReview(type, message, orderId, name) {
    const orders = doc(db, "Orders", orderId);
    console.log(orders);
    alert(userName);
    await updateDoc(orders, {
      deliveryReview: message,
      deliveryReviewed: true,
      deliveryType: type,
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
    userJoined,
    deliveryOrders,
    setDeliveryPerson,
    userId,
    myOrders,
    handleLogout,
    recommendedOrders,
    userRole,
    getUsers,
    deleteAccount,
    totalSpent,
    addToOrder,
    orders,
    writeOrderReviewUser,
    updateWallet,
    userWarnings,
    AddWarning,
    submitDishReview,
    orderId,
    submitDeliveryReview,
    submitOrderBid,
    orderDelivered,
    quitAccount,
    getQuitUsers,
    getBannedUsers
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
