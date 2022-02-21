
import React, { useContext, useState, useEffect } from "react"

const FoodContext = React.createContext();

export function useFood() {
    return useContext(FoodContext)
}

export function FoodProvider({ children }) {

    const [filteredFoodItems, setfilteredFoodItems] = useState([]);
    const [changeState, setChangeState] = useState(0);

    const [allFoodItems, setAllFoodItems] = useState([]);

    const FoodItems = [
        {
          "id": 1,
          "name": "Leanne Graham",
          "username": "Bret",
          "email": "Sincere@april.biz",
          "quantity": 0,
        },
        {
          "id": 5,
          "name": "Chelsey Dietrich",
          "username": "Kamren",
          "email": "Lucio_Hettinger@annie.ca",
          "quantity": 0,
        },
        {
          "id": 6,
          "name": "Mrs. Dennis Schulist",
          "username": "Leopoldo_Corkery",
          "email": "Karley_Dach@jasper.info",
          "quantity": 0,
        },
        {
          "id": 7,
          "name": "Kurtis Weissnat",
          "username": "Elwyn.Skiles",
          "email": "Telly.Hoeger@billy.biz",
          "quantity": 0,
        },
        {
          "id": 8,
          "name": "Nicholas Runolfsdottir V",
          "username": "Maxime_Nienow",
          "email": "Sherwood@rosamond.me",
          "quantity": 0,
        },
        {
          "id": 9,
          "name": "Glenna Reichert",
          "email": "Chaim_McDermott@dana.io",
          "quantity": 0,
        },
        {
          "id": 10,
          "name": "Clementina DuBuque",
          "email": "Rey.Padberg@karina.biz",
          "quantity": 0,
        }
    ];

    useEffect(() => {
      setAllFoodItems(FoodItems);
      setfilteredFoodItems(FoodItems);
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
    }

    return (
        <FoodContext.Provider value={v}>
        {children}
        </FoodContext.Provider>
    )
}