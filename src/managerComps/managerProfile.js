import './managerProfile.css'

import { useEffect, useState } from "react"
import { useAuth } from "../contexts/Authcontext";

export default function ManagerProfile() {

    const [choice, setChoice] = useState(0);
    const [orderChoice, setOrderChoice] = useState(0);

    const { getUsers, updateRole } = useAuth();
    const { deliveryOrders } = useAuth();
    let orderNumber = 1;

    function handleClick(i) {
        console.log(getUsers);
        setChoice(i);
    }

    function pickDelivery(i) {
        if (i == 1) {
            // pick delivery 1
        } else {
            // pick delivery 2
        }
    }
    
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
            {choice === 2 &&
                <div>
                    {
                    deliveryOrders.map((item) => {
                        return (
                            <div className="deliveryCard">
                                <div className={"deliveryLabel"}>
                                    <div>
                                        <h1>Order #{ orderNumber++ }</h1>
                                        <h3>Total Order Price: ${item.totalPrice}</h3>
                                    </div>
                                </div>
                                <button className={"btnDelivery1"} onClick={pickDelivery(1)}> Delivery Man #1 Bid: $xx</button>
                                <button className={"btnDelivery2"} onClick={pickDelivery(2)}> Delivery Man #2 Bid: $xx</button>
                                <div>
                                    <h4 className={"labelOrderDate"}>{item.orderDate}</h4>
                                </div>
                            </div>
                        );
                    })
                    }
                </div>
            }
        </div>
    )
}