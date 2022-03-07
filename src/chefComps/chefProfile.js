import './chefProfile.css'

import { useEffect, useState } from "react"
import { useAuth } from "../contexts/Authcontext";
import { useFood } from "../contexts/foodContext";

export default function() {

    const [choice, setChoice] = useState(0);
    const {allFoodItems} = useFood();

    const { userName, userWallet, userJoined } = useAuth();

    function handleClick(i) {
        // console.log(allFoodItems);
        setChoice(i);
    }

    return (
        <div className="chefProfile">
            <h1>Chef {userName}</h1>
            <div className="ChoicesLink">
                <div onClick = {() => {handleClick(0)}} style={choice == 0 ? {backgroundColor: "var(--yellow)"} : {}}>
                    My foods
                </div>
                <div onClick = {() => {handleClick(1)}} style={choice == 1 ? {backgroundColor: "var(--yellow)"} : {}}>
                    Compensation
                </div>
                <div onClick = {() => {handleClick(2)}} style={choice == 2 ? {backgroundColor: "var(--yellow)"} : {}}>
                    Create new dish
                </div>
            </div>
            {choice == 0 && 
                <div className='foodItemsUI'>
                {
                    allFoodItems.map((item, index) => {
                        // console.log(userName, item.chef)
                        if (userName == item.chef){
                        return (
                            <div className="recommendedLeftSideMain" key = {index}>
                                <div className="dishImage">
                                    <p></p>
                                </div>
                                <div style  = {{margin: "6% 0"}}>
                                    <h3>{item.name}</h3>
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
                                </div>
                            </div>
                        )}
                    })
                }
                </div>
            }
            {choice == 1 &&
              <div className='Salary'>
                <hr/>
                <b>Total Base Pay :&nbsp;&nbsp;</b> $ {userWallet}
                <hr/>
                <b>Currency :&nbsp;&nbsp;</b> USD
                <hr/>
                <b>Frequency :&nbsp;&nbsp;</b> Hourly
                <hr/>
                <b>Employment Start Date :&nbsp;&nbsp;</b> {userJoined}
              </div>
            }
            {choice == 2 &&
            <div className="createDish">
                {/*This Section is the SignUp Box*/}
                <div className={"dishBox"}>
                    <form onSubmit={() => { return false;} }>
                        <div className={"labelSpacing"}>
                            <label> Dish Name : </label>
                            <input type={"text"} className={"input"} placeholder="Enter Dish Name" name="dishName" required />
                        </div>
                        <div className={"labelSpacing"}>
                            <label> Description : </label>
                            <textarea type={"text"} className={"input"} placeholder="Enter Dish Description" name="description" required rows="8"/>
                        </div>
                        <div className={"labelSpacing"}>
                            <label> Dish Image url : </label>
                            <input type={"text"} className={"input"} placeholder="Enter an image URL for your dish" name="dishPic" required />
                        </div>
                        <div className={"labelSpacing"}>
                            <label > Price : </label>
                            <input type={"number"} className={"input"} placeholder="Enter Price" name="price" required />
                        </div>
                        <div className={"labelSpacing"}>
                            <select>
                                <option selected value="regukar">Regular</option>
                                <option value="chefSpecial">Chef Special</option>
                            </select>
                        </div>
                        <div className={"labelSpacingButton"}>
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