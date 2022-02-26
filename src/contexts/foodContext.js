
import React, { useContext, useState, useEffect } from "react"
import { collection, onSnapshot } from "firebase/firestore";

import { db } from "../firebase";

const FoodContext = React.createContext();

export function useFood() {
    return useContext(FoodContext)
}

export function FoodProvider({ children }) {

    const [filteredFoodItems, setfilteredFoodItems] = useState([]);
    const [changeState, setChangeState] = useState(0);

    const [allFoodItems, setAllFoodItems] = useState([]);     

    async function getDishes(db){
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

    async function clearData() {
      var temp = allFoodItems;
      for (var i = 0; i < temp.length; i++) {
        temp[i].quantity = 0;
      } 
      setAllFoodItems(temp);
      setfilteredFoodItems(temp);
      setChangeState(0);
    }

    useEffect(() => {
      setChangeState(0);
      getDishes(db);
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
        clearData
    }

    return (
        <FoodContext.Provider value={v}>
        {children}
        </FoodContext.Provider>
    )
}