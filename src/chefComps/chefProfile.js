import './chefProfile.css'

import { useEffect, useState, useRef } from "react"
import { useAuth } from "../contexts/Authcontext";
import { useFood } from "../contexts/foodContext";
import { AiFillStar } from "react-icons/ai";
import { Link } from 'react-router-dom';

export default function() {

    const [choice, setChoice] = useState(0);

    const { userId, userName, totalReviewCount, totalComplaints, totalCompliments, demotions} = useAuth();

    const { addNewDish, chefDishes, getChefFood } = useFood();

    const dishName = useRef("");
    const description = useRef("");
    const imageURL = useRef("");
    const price = useRef(0);
    const dishType = useRef("");

    function handleClick(i) {
        // console.log(allFoodItems);
        setChoice(i);
    }

    async function createANewDish(e) {
        e.preventDefault();
        const newDish = {
            name: dishName.current.value,
            description: description.current.value,
            image: imageURL.current.value,
            price: parseInt(price.current.value),
            special: dishType.current.value == "chefSpecial" ? true : false,
            chefId: userId,
            chef: userName,
            rating: 0,
            quantity: 0,
            count: 0
        };
        if (newDish.dishName == "" || newDish.description == "" || newDish.imageURL == "" || newDish.price == "") {
            document.getElementsByClassName("error")[0].innerHTML = "Please fill all the fields";
        } else {
            await addNewDish(newDish);
            alert("New Dish has been added");
            dishName.current.value = "";
            description.current.value = "";
            imageURL.current.value = "";
            price.current.value = 0;
            dishType.current.value = "regular";
        }
        console.log(newDish);
    }

    useEffect(() => {
        const test = async() => {  
            await getChefFood(userId); 
        }
        test();
        console.log(chefDishes);
    }, [])

    function getImage(imageName) {
        var a = "url('" + imageName + "')";
        return a;
    }

    return (
        <div className="chefProfile">
            <h1 style={{textAlign: "center"}}>{userName}</h1>

            <div className="deliveryStatsChef">
                <div>
                    <p>Complaints</p>
                    <h3>{totalComplaints !== undefined ? totalComplaints : 0}</h3>
                </div>
                <div>
                    <p>Compliments</p>
                    <h3>{totalCompliments !== undefined ? totalCompliments : 0}</h3>
                </div>
                <div>
                    <p>Bonus</p>
                    {(Math.floor(Math.abs(totalReviewCount / 3)) === 0 || totalReviewCount === undefined) &&
                        <h3>Nothing</h3>
                    }
                    {(Math.floor(totalReviewCount / 3) > 0) &&
                        <h3 style={{color: "green"}}>Bonus</h3>
                    }
                    {(Math.floor(Math.abs(totalReviewCount / 3)) > 0) && totalReviewCount < 0 &&
                        <h3 style={{color: "darkred"}}>Salary Cut</h3>
                    }
                </div>
                <div>
                    <p>Demotions</p>
                    <h3>{demotions !== undefined ? demotions : 0}</h3>
                </div>
            </div>
            <div className="ChoicesLink">
                <div onClick = {() => {handleClick(0)}} style={choice == 0 ? {backgroundColor: "var(--yellow)"} : {}}>
                    My foods
                </div>
                <div onClick = {() => {handleClick(1)}} style={choice == 1 ? {backgroundColor: "var(--yellow)"} : {}}>
                    Create new dish
                </div>
            </div>
            {choice == 0 && 
                <div className='foodItemsUI' style={{marginTop: "2%"}}>
                {
                    chefDishes.map((item, index) => {
                        // console.log(userName, item.chef)
                        if (userName == item.chef){
                        return (
                            <div className="recommendedLeftSideMain" key = {index}>
                                <div className="dishImage" style={{backgroundImage: getImage(item.image)}}>
                                    <p></p>
                                </div>
                                <div style  = {{margin: "6% 0"}}>
                                    <h3>{item.name}                                {   
                                        item.special &&
                                        <AiFillStar className='special'/>
                                    }</h3>
                                    <p style={{fontSize: "0.9em", margin: "7% 0 10% 0"}}>{item.description}</p>
                                    <div className="cardSeperation">
                                        <div>
                                            <h5>Rating</h5>
                                            <p>{item.rating}</p>
                                        </div>
                                        <div>
                                            <h5>Price</h5>
                                            <p>$ { item.price } </p>
                                        </div>
                                        {/* <div>
                                            <h5>Chef</h5>
                                            <p>{ item.chef } </p>
                                        </div> */}
                                    </div>
                                    <div style={{width: "100%", marginTop: "3%", textAlign: "right"}}>
                                        <button style={{backgroundColor: "transparent", cursor: "pointer", outline: "none", border: "none", color: "#0087bd"}}>
                                            <Link to={"/reviews/" + item.dishId} style={{color: "#0087bd"}}> See Reviews</Link>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    })
                }
                </div>
            }
            {choice == 1 &&
            <div className="createDish">
                {/*This Section is the SignUp Box*/}
                <div className={"dishBox"}>
                    <form onSubmit={(e) => {createANewDish(e)} }>
                        <div className={"labelSpacing"}>
                            <label> Dish Name : </label>
                            <input type={"text"} ref = {dishName} className={"input"} placeholder="Enter Dish Name" name="dishName" required />
                        </div>
                        <div className={"labelSpacing"}>
                            <label> Description : </label>
                            <textarea type={"text"} ref = {description} className={"input"} placeholder="Enter Dish Description" name="description" required rows="8"/>
                        </div>
                        <div className={"labelSpacing"}>
                            <label> Dish Image url : </label>
                            <input type={"text"} ref = {imageURL} className={"input"} placeholder="Enter an image URL for your dish" name="dishPic" required />
                        </div>
                        <div className={"labelSpacing"}>
                            <label > Price : </label>
                            <input type="number" min = {1} ref = {price} className={"input"} name="price" required />
                        </div>
                        <div className={"labelSpacing"}>
                            <select ref = {dishType}>
                                <option value="regular">Regular</option>
                                <option value="chefSpecial">Chef Special</option>
                            </select>
                        </div>
                        <div className={'labelSpacing'}>
                            <button className={"btnSubmit"}>Create Dish</button>
                        </div>
                        <div className='error' style = {{color: "var(--red)", textAlign: "center", marginTop: "2%"}}></div>
                    </form>
                </div>                


            </div>
            }
        </div>
    )
}