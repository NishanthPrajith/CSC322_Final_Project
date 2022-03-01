import './managerProfile.css'

import { useEffect, useState } from "react"
import { useAuth } from "../contexts/Authcontext";

export default function ManagerProfile() {

    const [choice, setChoice] = useState(0);
    const [orderChoice, setOrderChoice] = useState(0);

    const { getUsers, updateRole } = useAuth();

    function handleClick(i) {
        console.log(getUsers);
        setChoice(i);
    }

    function changeOrderChoice(i) {
        if (orderChoice === i) {
            setOrderChoice(-1);
        } else {
            setOrderChoice(i);
        }
    }

    var done = [1, 2, 3, 4, 5];

    return (
        <div className="managerProfile">
            <h1>Managers Page</h1>
            <div className="ChoicesLink">
                <div onClick = {() => {handleClick(0)}} style={choice == 0 ? {backgroundColor: "var(--yellow)"} : {}}>
                    Customer Approvals
                </div>
                <div onClick = {() => {handleClick(1)}} style={choice == 1 ? {backgroundColor: "var(--yellow)"} : {}}>
                    Complaints
                </div>
                <div onClick = {() => {handleClick(2)}} style={choice == 2 ? {backgroundColor: "var(--yellow)"} : {}}>
                    Delivery
                </div>
            </div>
            {choice === 0 && 
                <div>
                    { 
                    getUsers.map((item) => {
                        return (
                            <div className="userCard">
                                <div>
                                    <h3>{ item.name }</h3>
                                    <p>{ item.email }</p>
                                </div>
                                <div>
                                    <button onClick={() => {updateRole(item.id, 11)}}>
                                        Approve
                                    </button>
                                </div>
                            </div>
                        );
                    })
                    }
                </div>
            }

            {choice === 0 && 
                <div>
                    {done.map((item, i) => {
                        return (
                            <div className='UserOrderCard'>
                                <h2>Order #1</h2>
                                <div className='userCardInner'>
                                    <div>
                                        <p>Pineapple Pizza X 2</p>
                                        <p>Pineapple Pizza X 2</p>
                                    </div>
                                    <div>
                                        <h3>${item}</h3>
                                    </div>
                                </div>
                                <div className='OrderReview'>
                                    <button onClick={() => {changeOrderChoice(i)}}>
                                        Review Order
                                    </button>
                                </div>
                                {
                                    orderChoice === i &&
                                    <div className='OrderRatingForm'>
                                        <form onSubmit={() => {return false;}}>
                                            <div>
                                                <label for="rating">Rating :   </label>
                                                    <input type="number" name="rating" min ="0" max = "5" placeholder="Enter Rating" />
                                            </div>
                                            <label for="rating">Chef Complaint :   </label>
                                                <textarea name="chefComplaint" rows = "4">
                                                    Write your complaint for the chef here...
                                                </textarea>
                                            <label for="rating">Delivery Complaint :   </label>
                                                <textarea name="deliveryComplaint" rows = "4">
                                                    Write your complaint for the delivery here...
                                                </textarea>
                                            <button>Submit</button>
                                        </form>
                                    </div>
                                }
                            </div>
                        )
                    }
                    )}
                </div>
            }
        </div>
    )
}