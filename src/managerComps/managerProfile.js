import './managerProfile.css'

import { useEffect, useState, useRef } from "react"
import { useAuth } from "../contexts/Authcontext";

export default function ManagerProfile() {

    const [choice, setChoice] = useState(0);
    const [orderChoice, setOrderChoice] = useState(0);

    const { getUsers, updateRole, setDeliveryPerson, deliveryOrders } = useAuth();

    let orderNumber = 1;

    var deliveryName = {
        "qO2pUOremGaTHm4LGHnh9lP30C82": "Delivery One",
        "pF7O1rG6FIZre0Xpo4M5LQzUV7C2": "Delivery Two",
    }

    const [information, setinfo] = useState([]); 

    var memo = useRef();

    function handleClick(i) {
        console.log(getUsers);
        setChoice(i);
    }

    function pickDelivery(e, orderId, id, idTwo, role, bidOne, bidTwo) {
        e.preventDefault();
        var check = false;
        if (role === 1) {
            if (bidOne > bidTwo) {
                check = true
            } else {
                setDeliveryPerson(orderId, id, idTwo, "");
            }
        } else if (role === 2) {
            if (bidTwo > bidOne) {
                check = true;
            } else {
                setDeliveryPerson(orderId, id, idTwo, "");
            }
        }
        if (check) {
            var temp = [orderId, id, idTwo];
            setinfo(temp);
            document.getElementsByClassName("memo")[0].style.display = "flex";
        }
    }

    function submitMemo(e) {
        e.preventDefault();
        setDeliveryPerson(information[0], information[1], information[2], memo.current.value);
        memo.current.value = "";
        closeMemo(e);
    }

    function closeMemo(e) {
        e.preventDefault();
        document.getElementsByClassName("memo")[0].style.display = "none";
        setinfo([]);
    }
    
    useEffect(() => {
        console.log(deliveryOrders);
    }, []);
    
    return (
        <div className="managerProfile">
            <div className='memo' id = "memo">
                <div>
                    <h1>Memo</h1>
                    <div className='memoBox'>
                        <label>Reason</label>
                        <textarea ref = {memo} style={{resize : "none", marginTop: "2%"}} rows="10" cols="70" defaultValue={"Enter reason here."}>
                        </textarea>
                    </div>
                    <div className='memoBox'>
                        <button onClick={function(e) {submitMemo(e)}}>Submit Memo</button>
                        <button onClick={function(e) {closeMemo(e)}}>Close</button>
                    </div>
                </div>
            </div>
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
                        if (item.deliveryUserId === "") {
                            orderNumber = orderNumber + 1;
                            return (
                                <div className="deliveryCardTwo">
                                    <div className={"deliveryLabel"}>
                                        <div>
                                            <h2>Order #{ orderNumber - 1 }</h2>
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
                                        <button className={"btnDelivery1"} onClick={function(e) {pickDelivery(e, item.orderId, "qO2pUOremGaTHm4LGHnh9lP30C82", "pF7O1rG6FIZre0Xpo4M5LQzUV7C2", 1, item.bids["qO2pUOremGaTHm4LGHnh9lP30C82"], item.bids["pF7O1rG6FIZre0Xpo4M5LQzUV7C2"])}}>{deliveryName["qO2pUOremGaTHm4LGHnh9lP30C82"]} Bid : ${item.bids["qO2pUOremGaTHm4LGHnh9lP30C82"]}!</button>
                                    }
                                    {item.bids["pF7O1rG6FIZre0Xpo4M5LQzUV7C2"] === undefined &&
                                        <button className={"btnDelivery2"}>{deliveryName["pF7O1rG6FIZre0Xpo4M5LQzUV7C2"]} did not bid yet!</button>
                                    }
                                    {item.bids["pF7O1rG6FIZre0Xpo4M5LQzUV7C2"] !== undefined &&
                                        <button className={"btnDelivery2"} onClick={function(e) {pickDelivery(e, item.orderId, "pF7O1rG6FIZre0Xpo4M5LQzUV7C2", "qO2pUOremGaTHm4LGHnh9lP30C82", 2, item.bids["qO2pUOremGaTHm4LGHnh9lP30C82"], item.bids["pF7O1rG6FIZre0Xpo4M5LQzUV7C2"])}}>{deliveryName["pF7O1rG6FIZre0Xpo4M5LQzUV7C2"]} Bid : ${item.bids["pF7O1rG6FIZre0Xpo4M5LQzUV7C2"]}!</button>
                                    }
                                </div>
                            );
                        }
                    })
                    }
                </div>
            }
        </div>
    )
}