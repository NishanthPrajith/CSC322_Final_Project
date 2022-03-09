
import React, { useContext, useState, useEffect } from "react"
import { collection, onSnapshot, query, orderBy, limit} from "firebase/firestore";

import { db } from "../firebase";

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

    async function getDishes(db){
      getHighestRatedDishes();
      const food = collection(db, "Dishes");
      onSnapshot(food, (querySnapshot) => {
          const data = [];
          querySnapshot.forEach((doc) => {
            data.push(doc.data());
          });
          setAllFoodItems(data);
          setfilteredFoodItems(data);
        });
    }

    async function getHighestRatedDishes() {
      getPopularDishes();
        const food = collection(db, "Dishes");
        const q = query(food, orderBy("rating", "desc"), limit(3));
        onSnapshot(q, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });
            setHighestRated(data);
        });
    }

    async function getPopularDishes() {
      const food = collection(db, "Dishes");
      const q = query(food, orderBy("count", "desc"), limit(3));
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
      setChangeState(0);
      getDishes(db);
      getHighestRatedDishes();
    }, [])

    function changeFlilteredFoodItems(value) {
      setfilteredFoodItems(value);
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

    function totalCartCount() {
      var sum = 0;
      for (let i = 0; i < allFoodItems.length; i++) {
        sum += allFoodItems[i].quantity;
      }
      console.log(allFoodItems);
      setChangeState(sum);
    }

    const v = {
        changeFlilteredFoodItems,
        filteredFoodItems,
        allFoodItems,
        changeState,
        clearData,
        highestRated,
        popularDishes,
        changeAllFoodItems,
        changeHighestRated,
        changePopularDishes,
    }

    return (
        <FoodContext.Provider value={v}>
        {children}
        </FoodContext.Provider>
    )
}