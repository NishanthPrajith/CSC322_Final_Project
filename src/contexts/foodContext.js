
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
      getHighestRatedDishes();
      setChangeState(0);
    }

    useEffect(() => {
      setChangeState(0);
      getDishes(db);
      getHighestRatedDishes();
    }, [])

    function changeFlilteredFoodItems(value) {
      setfilteredFoodItems(value);
      var temp = allFoodItems;
      for (let i = 0; i < value.length; i++) {
        for (let j = 0; j < temp.length; j++) {
          if (value[i].name === temp[j].name) {
            temp[j].quantity = value[i].quantity;
            break;
          }
        }
      }
      setAllFoodItems(temp);
      totalCartCount();
    }

    function changeHighestRatedDishes(index, role) {
      var temp = highestRated;
      if (role === 1) {
        temp[index].quantity = temp[index].quantity + 1;
      } else {
        temp[index].quantity = temp[index].quantity === 0 ? 0 : temp[index].quantity - 1; 
      }
      setHighestRated(temp);
    }

    function changePopularDishes(index, role) {
      var temp = popularDishes;
      if (role === 1) {
        temp[index].quantity = temp[index].quantity + 1;
      } else {
        temp[index].quantity = temp[index].quantity === 0 ? 0 : temp[index].quantity - 1; 
      }
      setPopularDishes(temp);
    }

    function totalCartCount() {
      var sum = 0;
      for (let i = 0; i < allFoodItems.length; i++) {
        sum += allFoodItems[i].quantity;
      }
      console.log(allFoodItems);
      console.log(sum);
      setChangeState(sum);
    }

    const v = {
        changeFlilteredFoodItems,
        filteredFoodItems,
        allFoodItems,
        changeState,
        clearData,
        highestRated,
        changeHighestRatedDishes,
        popularDishes,
        changePopularDishes
    }

    return (
        <FoodContext.Provider value={v}>
        {children}
        </FoodContext.Provider>
    )
}