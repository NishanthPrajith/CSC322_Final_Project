import './checkoutCart.css';
import { FiArrowRightCircle } from "react-icons/fi";
import { MdOutlineDeliveryDining } from "react-icons/md";

import { useFood } from '../contexts/foodContext';
import { useState } from 'react';
import { useAuth } from '../contexts/Authcontext';

import {useNavigate} from 'react-router-dom';


export default function CheckoutCart() {
    
    var { loggedIn, userRole, userWallet, addToOrder, orderId, AddWarning, userId } = useAuth();

    var {clearData, allFoodItems} = useFood();

    var history = useNavigate();

    const [loading, setLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0.00);
    const [foodDeliveryChoice, setfoodDeliveryChoice] = useState(true);

    async function placeOrder(state) {
        console.log(state);
        var total = totalCount;
        if (userRole === 111) {
            total = (totalCount - (totalCount * 0.05)).toFixed(2);
        }
        if (state === 2) {
            total = (parseFloat(total) + 3).toFixed(2);
        }
        if (userRole === 111 && state === 2 && (orderId.length % 4 === 3)) {
            total = (parseFloat(total) - 3).toFixed(2);
        }
        if (totalCount > 0) {
            if (total > userWallet) {
                alert("You don't have enough money in your wallet");
                await AddWarning(userId);
            } else {
                var document = {};
                document.totalPrice = parseFloat(total).toFixed(2);
                document.state = state;
                var order = [];
                for (var i = 0; i < allFoodItems.length; i++) {
                    var done = {}; 
                    if (allFoodItems[i].quantity > 0) {
                        done.dishId = allFoodItems[i].dishId;
                        done.name = allFoodItems[i].name;
                        done.count = allFoodItems[i].quantity;
                        order.push(done);
                    }
                }
                document.order = order;
                if (state === 2) {
                    document.orderStatus = true;
                } else {
                    document.orderStatus = false;
                }
                console.log(document);
                await addToOrder(document);
                console.log(document);

                await clearData();

                history("/finalPage", {replace: true});
            }
        } else {
            alert("Add items to your cart");
        }
    }


    function calculateTotal() {
        var total = 0.00;
        for (var i = 0; i < allFoodItems.length; i++) {
            total += allFoodItems[i].price * allFoodItems[i].quantity
        }
        total = parseFloat(total.toFixed(2));
        console.log("Total : ", total); 
        setTotalCount(total);
    }

    if (loading) {
        if (allFoodItems.length > 0) {
            calculateTotal();
            setLoading(false);
        }
        return <div className='Loading'>
        </div>
    }

    return (
        <div className="checkout-cart">
            <h1 className="checkoutPageHeading">Review Your Cart</h1>
            <div style = {{margin: "0 1%"}}>
            {
                allFoodItems.map((item) => {
                    if (item.quantity > 0) {
                        return (
                            <div className="checkoutItem">
                                <div className="checkoutItemDes">
                                    <h3>{item.name}</h3>
                                </div>
                                <div className="checkoutItemPrice">
                                    <h4>$ {item.price} </h4>
                                    <span>X</span>
                                    <p>{item.quantity}</p>
                                </div>
                            </div>
                        );
                    }
                })
            }
            </div>
            <div className="totalCheckoutPage">
                <hr></hr>
                {userRole == 111 &&
                    <div>
                        <h4>VIP Discount</h4>
                        <div>
                            <p>-$ {(totalCount == NaN ? "0" : totalCount * 0.05).toFixed(2)}</p>
                        </div>
                    </div>
                }
                {totalCount > 0 && !foodDeliveryChoice &&
                <div>
                    <h4 style= {{display: "flex", alignItems: "center", width: "100%"}}>Delivery Fee <MdOutlineDeliveryDining style={{paddingLeft: "2%"}} /> </h4>
                    <div style={{ width: "100%", textAlign: "right"}}>
                        {(orderId.length % 4 === 3) && (userRole == 111) ? <p style={{width: "100%"}}>Free Delivery</p> : <p style={{width: "100%"}}>+$3</p>}
                    </div>
                </div>
            }                
                <div>
                    <h3>
                        Total
                    </h3>
                    {userRole == 111 && !foodDeliveryChoice && (orderId.length % 4 !== 3) &&
                        <h2>
                            $ { totalCount == NaN ? "0" : parseFloat((totalCount - (totalCount * 0.05)).toFixed(2)) + 3 }
                        </h2>
                    }
                    {userRole == 111 && !foodDeliveryChoice && (orderId.length % 4 === 3) &&
                        <h2>
                            $ { totalCount == NaN ? "0" : parseFloat((totalCount - (totalCount * 0.05)).toFixed(2)) }
                        </h2>
                    }
                    {userRole == 111 && foodDeliveryChoice &&
                        <h2>
                            $ { totalCount == NaN ? "0" : (totalCount - (totalCount * 0.05)).toFixed(2) }
                        </h2>
                    }
                    {userRole == 11 && !foodDeliveryChoice &&
                        <h2>
                            $ { totalCount == NaN ? "0" : totalCount + 3}
                        </h2>
                    }
                    {userRole == 11 && foodDeliveryChoice &&
                        <h2>
                            $ { totalCount == NaN ? "0" : totalCount}
                        </h2>
                    }
                          
                </div>
                {
                    (!loggedIn || (userRole !== 111 && userRole !== 11)) &&
                    <div style={{marginTop: "10%", fontSize: "1.2em", color: "var(--red)"}}>
                        <p>You have to be a registered customer to purchase!</p>
                    </div>
                }
                {loggedIn && (userRole === 111 || userRole === 11) && 
                <div>
                    <button className='checkoutPageButton' style = {foodDeliveryChoice ? {backgroundColor: "var(--yellow)"}: {}} onClick={() => {setfoodDeliveryChoice(true)}}>
                        Pick Up <FiArrowRightCircle className='checkoutArrow'/>
                    </button>
                    <button className='checkoutPageButton' style = {!foodDeliveryChoice ? {backgroundColor: "var(--yellow)"}: {}} onClick={() => {setfoodDeliveryChoice(false)}}>
                        Delivery <FiArrowRightCircle className='checkoutArrow'/>
                    </button>
                </div>
                }
                {
                    loggedIn && (userRole === 111 || userRole === 11) &&
                    <div>
                        <button className='checkoutPageButtonFinal' onClick={() => {placeOrder(foodDeliveryChoice ? 1 : 2)}}>
                            Checkout Out <FiArrowRightCircle className='checkoutArrow'/>
                        </button>
                    </div>        
                }
            </div>
        </div>
    );
}