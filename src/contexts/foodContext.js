
import React, { useContext, useState, useEffect } from "react"
import { collection, onSnapshot, addDoc, doc, getDoc, getDocs, where, query, orderBy, limit, updateDoc} from "firebase/firestore";

import { db } from "../firebase";

import { useAuth } from "./Authcontext";


const FoodContext = React.createContext();

export function useFood() {
    return useContext(FoodContext)
}

export function FoodProvider({ children }) {

    const [filteredFoodItems, setfilteredFoodItems] = useState([]);
    const [changeState, setChangeState] = useState(0);

    const [highestRated, setHighestRated] = useState([]);
    const [popularDishes, setPopularDishes] = useState([]);

    const [allFoodItems, setAllFoodItems] = useState([]); 
    
    const [recommendedDishes, setRecommendedDishes] = useState([]);

    const [deliveryPeople, setDeliveryPeople] = useState([]);
    const [chefPeople, setChefPeople] = useState([]);

    const [chefJobsApplications, setChefJobsApplications] = useState([]);
    const [deliveryJobsApplications, setDeliveryJobsApplications] = useState([]);

    const { userRole } = useAuth();

    const [allReviews, setReviews] = useState([]);

    const [chefDishes, setChefDishes] = useState([]);

    async function getChefFood(userId) {
        const chefDishes = collection(db, "Dishes");
        console.log(userId)
        onSnapshot(chefDishes, (snapshot) => {
            const chefDishes = [];
            snapshot.forEach((doc) => {
                console.log(doc.data());
                if (doc.data().chefId == userId) {
                    chefDishes.push(doc.data());
                }
            });
            setChefDishes(chefDishes);
        }
        );
    }

    async function getReviews(dishId) {
      const g = collection(db, "Reviews");
      await onSnapshot(g, (snapshot) => {
        var reviews = [];
        snapshot.forEach((doc) => {
            if (doc.data().dishId == dishId) {
                reviews.push(doc.data());
            }
        });
        console.log(reviews);
        setReviews(reviews);
      });
    }

    async function getDishes(){
      var food = collection(db, "Dishes");
      if (userRole !== 111) {
        food = query(food, where("special", "==", false));
      }
      onSnapshot(food, (querySnapshot) => {
          const data = [];
          querySnapshot.forEach((doc) => {
            if (userRole !== 111 && doc.data().special !== true) {
              data.push(doc.data());
            } else if (userRole === 111) {
              data.push(doc.data());
            }
          });
          setAllFoodItems(data);
          setfilteredFoodItems(data);
          setChangeState(0);
        });
      getHighestRatedDishes(food);
    }

    async function getHighestRatedDishes(food) {
      getPopularDishes(food);
      var q = query(food, orderBy("rating", "desc"), limit(3));
      onSnapshot(q, (querySnapshot) => {
          const data = [];
          querySnapshot.forEach((doc) => {
              data.push(doc.data());
          });
          setHighestRated(data);
      });
    }

    async function getPopularDishes(food) {
      var q = query(food, orderBy("count", "desc"), limit(3));
      onSnapshot(q, (querySnapshot) => {
          const data = [];
          querySnapshot.forEach((doc) => {
              data.push(doc.data());
          });
          setPopularDishes(data);
      });
  }

    async function clearData() {
      var temp = allFoodItems;
      for (var i = 0; i < temp.length; i++) {
        temp[i].quantity = 0;
      } 
      setAllFoodItems(temp);
      setfilteredFoodItems(temp);
      var temp2 = highestRated;
      for (var i = 0; i < temp2.length; i++) {
        temp2[i].quantity = 0;
      }
      setHighestRated(temp2);
      var temp3 = popularDishes;
      for (var i = 0; i < temp3.length; i++) {
        temp3[i].quantity = 0;
      }
      setPopularDishes(temp3);
      setChangeState(0);
    }

    useEffect(() => {
      console.log("Food role", userRole);
      setChangeState(0);
      getDishes();
      getChefFood();
      getHighestRatedDishes();
      getDeliveryPeople();
      getChefPeople();
      getDeliveryJobApplications();
      getChefJobApplications();
    }, [])

    function changeFlilteredFoodItems(value) {
      setfilteredFoodItems(value);
    }

    async function getDeliveryJobApplications() {
      var people = collection(db, "Users");
      onSnapshot(people, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().role === 2) {
            data.push(doc.data());
          }
        });
        setDeliveryJobsApplications(data);
      });
    }

    async function getChefJobApplications() {
      var people = collection(db, "Users");
      onSnapshot(people, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().role === 1) {
            data.push(doc.data());
          }
        });
        setChefJobsApplications(data);
      });
    }

    async function getDeliveryPeople() {
      var people = collection(db, "Users");
      onSnapshot(people, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().role === 33) {
            data.push(doc.data());
          }
        });
        setDeliveryPeople(data);
      });
    }

    async function getChefPeople() {
      var people = collection(db, "Users");
      onSnapshot(people, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().role === 22) {
            data.push(doc.data());
          }
        });
        setChefPeople(data);
      });
    }



    async function getRecommendedDishes(a) {
      var data = [];
      for (var i = 0; i < a.length; i++) {
        var q = query(collection(db, "Dishes"), where("name", "==", a[i]));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          if (doc.data().special !== true && userRole !== 111) {
            doc.data().quantity = 0;
            data.push(doc.data());
          }
        });
      }
      setRecommendedDishes(data);
    }

    async function updateRatings(info) {
      var d = info;
      for (var i = 0; i < info.length; i++) {
        const docRef = doc(db, "Dishes", d[i].dishId);
        const docSnap = await getDoc(docRef);
        const info = docSnap.data();
        console.log(info);
        var count = info.count;
        var rating = info.rating;
        var newRating = rating * count;
        newRating = newRating + parseInt(d[i].rating);
        newRating = newRating / (count + 1);
        newRating = Number.parseFloat(newRating).toFixed(2)
        await updateDoc(docRef, {
          count: count + 1,
          rating: newRating
        });
      }
    }

    async function addNewDish(data) {
      var q = collection(db, "Dishes");
      const docRef = await addDoc(q, data);
      await updateDoc(doc(db, "Dishes", docRef.id), {
        dishId: docRef.id,
      });
    }

    function changeAllFoodItems(temp, role) {
      var a = allFoodItems;
      console.log(a, temp);
      for (var i = 0; i < temp.length; i++) {
        for (var j = 0; j < a.length; j++) {
          if (temp[i].name === a[j].name) {
            if (role === 1) {
              a[j].quantity = Math.max(temp[i].quantity, a[j].quantity);
            } else {
              a[j].quantity = Math.min(temp[i].quantity, a[j].quantity);
            }
          }
        }
      }
      setAllFoodItems(a);
      totalCartCount();
    }

    function changeHighestRated(temp) {
      setHighestRated(temp);
    }

    function changePopularDishes(temp) {
      setPopularDishes(temp);
    }

    function changeRecommendedDishes(temp) {
      setRecommendedDishes(temp);
    }

    function totalCartCount() {
      console.log("total cart count");
      console.log(allFoodItems);
      console.log("---------------");
      var sum = 0;
      for (let i = 0; i < allFoodItems.length; i++) {
        sum += allFoodItems[i].quantity;
      }
      console.log(allFoodItems);
      setChangeState(sum);
    }


    const v = {
        deliveryPeople, chefPeople,
        chefJobsApplications, deliveryJobsApplications,
        changeFlilteredFoodItems,
        filteredFoodItems,
        allFoodItems,
        changeState,
        clearData,
        addNewDish,
        getChefFood,
        highestRated,
        popularDishes,
        changeAllFoodItems,
        changeHighestRated,
        changePopularDishes,
        changeRecommendedDishes,
        getDishes,
        recommendedDishes,
        getRecommendedDishes,
        totalCartCount,
        chefDishes,
        getReviews,
        allReviews,
        updateRatings
    }

    return (
        <FoodContext.Provider value={v}>
        {children}
        </FoodContext.Provider>
    )
}