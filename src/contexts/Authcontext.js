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

  // Delivery Related Data
  const [deliveryOrders, setDeliveryOrders] = useState([]);
  const [myOrders, setMyOrders] = useState([]);

  const [totalReviewCount, setTotalReviewCount] = useState(0);
  const [totalComplaints, setTotalComplaints] = useState(0);
  const [totalCompliments, setTotalCompliments] = useState(0);
  const [demotions, setDemotions] = useState(0);

  // Manager related Data
  const [getUsers, setGetUsers] = useState([]);
  const [getQuitUsers, setGetQuitUsers] = useState([]);
  const [getBannedUsers, setGetBannedUsers] = useState([]);
  const [getComplaints, setGetComplaints] = useState([]);

  async function handleLogout() {
    await signOut(auth);
    setUserId("");
    setDemotions(0);
    setCurrentUser(null);
    setTotalComplaints(0);
    setTotalCompliments(0);
    setTotalReviewCount(0);
    setLoggedIn(false);
    setCurrentUser(null);
    setUserRole(-1);
    setGetUsers([]);
    setGetQuitUsers([]);
    setGetBannedUsers([]);
    setOrderId([]);
    setOrders([]);
    setMyOrders([]);
    setDeliveryOrders([]);
    setGetComplaints([]);
    setUserName("");
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
    const g = await query(collection(db, "Users"), where("quit", "==", true));
    onSnapshot(g, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
        cities.push(doc.data());
      });
      setGetQuitUsers(cities);
      console.log(cities);
    });
    console.log("get banned users");
    const h = await query(collection(db, "Users"), where("role", "==", 222));
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

  async function addusertoDB(name, email, id, type) {
    var temp = id;
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var r = 0;
    if (type === "Delivery Person") {
      r = 2;
    } else if (type === "Chef") {
      r = 1;
    }
    await handleLogout();
    await setDoc(doc(db, "Users", temp), {
      name: name,
      email: email,
      wallet: 0.0,
      role: r,
      id: id,
      joined: date,
      orders: [],
      warnings: 0,
      totalSpent: 0,
    }); 
  }

  async function signup(name, email, password, role) {
    // Our async function is important because this allows our data to update live rather than waiting to refresh.
    const ret3 = await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        let ret1 = userCredential.user.uid;
        addusertoDB(name, email, ret1, role);
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
      setUserId(doc.data().id);
      setUserRole(doc.data().role);
      setTotalComplaints(doc.data().totalComplaints);
      setTotalCompliments(doc.data().totalCompliments);
      setTotalReviewCount(doc.data().totalReviewCount);
      setDemotions(doc.data().demotions);
      setUserName(doc.data().name);
      setUserWallet(doc.data().wallet);      
      setUserJoined(doc.data().joined);
      setTotalSpent(doc.data().totalSpent);
      setOrderId(doc.data().orders);
      setUserWarning(doc.data().warnings);
      getOrders(doc.data().orders);
      console.log("Role : " + doc.data().role);
      setLoggedIn(true);
      if (doc.data().role === 0 || doc.data().role === 1 || doc.data().role === 2) {
        handleLogout();
        alert("You are not authorized to access this page");
        info();
      } else if (doc.data().role === 1001) {
        getUserAccounts();
        getOrderComplaints();
        getDeliveryOrders("manager");
      } else if (doc.data().role === 333) {
        info();
        handleLogout();
        alert("You have been permantly banned from the system and the money you had in your wallet has been returned to you");
      } else if (doc.data().role === 222) {
        handleLogout();
        info();
      } else if (doc.data().quit === true) {
        handleLogout();
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

  async function setDeliveryPerson(orderId, chosenId, memo, deliveryPeople) {
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

    for (var i = 0; i < deliveryPeople.length; i++) {
      if (deliveryPeople[i].id !== chosenId) {
        var secondId = deliveryPeople[i].id;
        const docRef = doc(db, "Users", secondId);
        const docSnap = await getDoc(docRef);
        var count = docSnap.data().countOrders;
        if (count === undefined) {
          count = 0;
        }
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
    }
  }

  async function getDeliveryOrders(a) {
    const food = collection(db, "Orders");
    const v = await onSnapshot(food, (querySnapshot) => {
        var data = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().orderStatus === true) {
            data.push(doc.data());
          }
        });
        console.log("delivery Info", data);
        setDeliveryOrders(data);
        data = [];
      });
  }

  async function getMyOrders(id) {
    const food = collection(db, "Orders");
    const v = await onSnapshot(food, (querySnapshot) => {
        var data = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().deliveryUserId === id) {
            console.log("made a push");
            console.log("userId here is ", id)
            data.push(doc.data());
          }
        });
        setMyOrders(data);
        data = [];
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
      setUserWarning(0);
      setUserRole(11);
    } else if (state === 2 && userRole === 11) {
      alert("You have received too many warnings and manager will decide to delete you from the system");
      await updateDoc(doc(db, "Users", userId), {
        role: 222,
        warnings: 3
      });
    }
  }

  async function quitAccount() {
    alert("Thank you so much! Your account will be deleted and the money refunded to your account");
    console.log(userId);
    await updateDoc(doc(db, "Users", userId), {
      quit: true
    });
    await handleLogout();
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

  function run(a, b) {
    var v = new Date(a.orderDate);
    var g = new Date(b.orderDate);
    return g - v;
  }

  async function getOrders(ord) {
    console.log(ord);
    if (ord.length !== 0) {
      console.log("check");
      const q = collection(db, "Orders");
      var data = [];
      const v = await onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (ord.includes(doc.data().orderId)) {
            data.unshift(doc.data());
          }
        });
        data.sort((a, b) => run(a, b))
        console.log(data);
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
    if (userWarnings + 1 === 2 && userRole === 111) {
      await accountStatusChange(2);
    } else if (userWarnings + 1 === 3 && userRole === 11) {
      await accountStatusChange(2);
    } else {
      await updateDoc(doc(db, "Users", id), {
        warnings: userWarnings + 1
      });
      setUserWarning(userWarnings + 1);
    }
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
    await updateDoc(orders, {
      deliveryReview: message,
      deliveryType: type,
    });
  }

  async function addDeliveryPersonReview(review, orderId) {
    await updateDoc(doc(db, "Orders", orderId), {
      deliveryPersonReviewed: true,
      deliveryPersonReview: review
    });
  }

  async function getOrderComplaints() {
    const v = await onSnapshot(collection(db, "Orders"), (querySnapshot) => {
      var data = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().state === 2) {
          data.push(doc.data());
        }
      });
      setGetComplaints(data);
      data = [];
    });
  }

  async function getUsersName(id) {
    const docRef = doc(db, "Users", id);
    const docSnap = await getDoc(docRef);

    var v = docSnap.data();
    return v.name;
  }

  async function closeComplaint(id) {
    const docRef = doc(db, "Orders", id);
    await updateDoc(docRef, {
      caseClosed: true
    });
  }

  async function giveDeliveryWarning(id) {
    const docRef = doc(db, "Users", id);
    const docSnap = await getDoc(docRef);
    const count = docSnap.data().warnings;
    await updateDoc(doc(db, "Users", id), {
      warnings: count + 1
    });
  }

  async function giveUserWarning(id) {
    const docRef = doc(db, "Users", id);
    const docSnap = await getDoc(docRef);
    const count = docSnap.data().warnings;
    const role = docSnap.data().role;    
    if (count + 1 === 2 && role === 111) {
      await changeAccountStatus(id, role, 0);
    } else if (count + 1 === 3 && role === 11) {
      await changeAccountStatus(id, role, count + 1);
    } else {
      await updateDoc(doc(db, "Users", id), {
        warnings: count + 1
      });
    }
  }

  async function changeAccountStatus(id, role, warnings) {
    if (role === 111) {
      await updateDoc(doc(db, "Users", id), {
        role: 11,
        warnings: 0,
      });
    } else if (role === 11) {
      await updateDoc(doc(db, "Users", id), {
        role: 222,
        warnings: warnings,
      });
    }
  }

  async function updateChefs(info) {
    var v = info;
    for(var i = 0; i < info.length; i++) {
      const docRef = doc(db, "Dishes", v[i].dishId);
      const docSnap = await getDoc(docRef);
      const chefData = docSnap.data().chefId;

      const a = doc(db, "Users", chefData);
      const b = await getDoc(a);
      const compliments = b.data().totalCompliments;
      const complaints = b.data().totalComplaints;
      const total = b.data().totalReviewCount;

      var control = userRole === 111 ? 2 : 1; // Check for VIP

      if (v[i].ratingType === "Compliment") {
        if (compliments === undefined) {
          await updateDoc(a, {
            totalCompliments: control
          });
        } else {
          await updateDoc(a, {
            totalCompliments: compliments + control
          });
        }
        if (total === undefined) {
          await updateDoc(a, {
            totalReviewCount: control,
            demotions: 0
          });
        } else {
          var demote = total + control;
          if (demote < 0) {
            demote = Math.floor(Math.abs(demote));
          } else {
            demote = 0;
          }
          await updateDoc(a, {
            totalReviewCount: total + control,
            demotions: demote
          });
        }
      } else {
        if (complaints === undefined) {
          await updateDoc(a, {
            totalComplaints: control
          });
        } else {
          await updateDoc(a, {
            totalComplaints: complaints + control
          });
        }
        if (total === undefined) {
          await updateDoc(a, {
            totalReviewCount: -control,
            demotions: 0
          });
        } else {
          var demote = total - control;
          if (demote < 0) {
            demote = Math.floor(Math.abs(demote));
          } else {
            demote = 0;
          }
          await updateDoc(a, {
            totalReviewCount: total - control,
            demotions: demote
          });
          if (demote === 2) {
            updateRole(chefData, 333);
          }
        }
      }
    }
  }

  async function updateDelivery(type, id) {
    const a = doc(db, "Users", id);
    const b = await getDoc(a);
    const compliments = b.data().totalCompliments;
    const complaints = b.data().totalComplaints;
    const total = b.data().totalReviewCount;

    var control = userRole === 111 ? 2 : 1; // Check for VIP

    if (type === "Compliment") {
      if (compliments === undefined) {
        await updateDoc(a, {
          totalCompliments: control
        });
      } else {
        await updateDoc(a, {
          totalCompliments: compliments + control
        });
      }
      if (total === undefined) {
        await updateDoc(a, {
          totalReviewCount: control,
          demotions: 0
        });
      } else {
        var demote = total + control;
        if (demote < 0) {
          demote = Math.floor(Math.abs(demote) / 3);
        } else {
          demote = 0;
        }
        await updateDoc(a, {
          totalReviewCount: total + control,
          demotions: demote
        });
      }
    } else {
      if (complaints === undefined) {
        await updateDoc(a, {
          totalComplaints: control
        });
      } else {
        await updateDoc(a, {
          totalComplaints: complaints + control
        });
      }
      if (total === undefined) {
        await updateDoc(a, {
          totalReviewCount: - control,
          demotions: 0
        });
      } else {
        var demote = total - control;
        if (demote < 0) {
          demote = Math.floor(Math.abs(demote) / 3);
        } else {
          demote = 0;
        }
        await updateDoc(a, {
          totalReviewCount: total - control,
          demotions: demote
        });
        if (demote === 2) {
          updateRole(id, 333);
        }
      }
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
    totalReviewCount, totalComplaints, totalCompliments, demotions,
    updateRole, 
    currentUser,
    updateDelivery,
    getComplaints,
    login,
    signup,
    loggedIn,
    giveDeliveryWarning,
    giveUserWarning,
    userName,
    getUsersName,
    userWallet,
    userJoined,
    deliveryOrders,
    setDeliveryPerson,
    closeComplaint,
    userId,
    myOrders,
    handleLogout,
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
    getBannedUsers,
    updateChefs,
    addDeliveryPersonReview
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
