import './managerProfile.css'

import { useEffect, useState } from "react"
import { useAuth } from "../contexts/Authcontext";

export default function ManagerProfile() {

    const [choice, setChoice] = useState(0);
    const [orderChoice, setOrderChoice] = useState(0);

    const { getUsers, updateRole } = useAuth();
    const { deliveryOrders } = useAuth();
    let orderNumber = 1;

    var deliveryName = {
        "qO2pUOremGaTHm4LGHnh9lP30C82": "Delivery One",
        "pF7O1rG6FIZre0Xpo4M5LQzUV7C2": "Delivery Two",
    }

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
    
    useEffect(() => {
        console.log(deliveryOrders);
    }, []);
    
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
                <div style={{marginTop: "5%"}}>
                    {
                    deliveryOrders.map((item, index) => {
                        return (
                            <div className="deliveryCardTwo">
                                <div className={"deliveryLabel"}>
                                    <div>
                                        <h2>Order #{ index + 1 }</h2>
                                        <h4>Total Order Price : <span style={{fontSize: "1.5em"}}>${item.totalPrice}</span></h4>
                                    </div>
                                </div>
                                <div style={{display: "flex", justifyContent: "flex-end"}}>
                                    <h5 className={"labelOrderDate"}>{item.orderDate}</h5>
                                </div>
                                {item.bids["qO2pUOremGaTHm4LGHnh9lP30C82"] === undefined &&
                                    <button className={"btnDelivery1"}>{deliveryName["qO2pUOremGaTHm4LGHnh9lP30C82"]} did not bid yet!</button>
                                }
                                {item.bids["qO2pUOremGaTHm4LGHnh9lP30C82"] !== undefined &&
                                    <button className={"btnDelivery1"} onClick={pickDelivery(1)}>{deliveryName["qO2pUOremGaTHm4LGHnh9lP30C82"]} Bid : ${item.bids["qO2pUOremGaTHm4LGHnh9lP30C82"]}!</button>
                                }
                                {item.bids["pF7O1rG6FIZre0Xpo4M5LQzUV7C2"] === undefined &&
                                    <button className={"btnDelivery2"}>{deliveryName["pF7O1rG6FIZre0Xpo4M5LQzUV7C2"]} did not bid yet!</button>
                                }
                                {item.bids["pF7O1rG6FIZre0Xpo4M5LQzUV7C2"] !== undefined &&
                                    <button className={"btnDelivery2"} onClick={pickDelivery(2)}>{deliveryName["pF7O1rG6FIZre0Xpo4M5LQzUV7C2"]} Bid : $ {item.bids["pF7O1rG6FIZre0Xpo4M5LQzUV7C2"]}!</button>
                                }
                            </div>
                        );
                    })
                    }
                </div>
            }
        </div>
    )
}