import './checkoutCart.css';
import { FiArrowRightCircle } from "react-icons/fi";

import { useFood } from '../contexts/foodContext';
import { useState } from 'react';
import { useAuth } from '../contexts/Authcontext';

import {useNavigate} from 'react-router-dom';


export default function CheckoutCart() {
    
    var { loggedIn, userRole, userWallet, addToOrder, AddWarning, userId } = useAuth();

    var {clearData, allFoodItems} = useFood();

    var history = useNavigate();

    const [loading, setLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0.00);

    async function placeOrder(state) {
        console.log(state);
        var total = totalCount;
        if (userRole === 111) {
            total = (totalCount - (totalCount * 0.05)).toFixed(2)
        }
        if (total > 0) {
            if (total > userWallet) {
                alert("You don't have enough money in your wallet");
                await AddWarning(userId);
            } else {
                var document = {};
                document.totalPrice = total;
                document.state = state;
                var order = [];
                for (var i = 0; i < allFoodItems.length; i++) {
                    var done = {}; 
                    console.log(allFoodItems[i].name);
                    if (allFoodItems[i].quantity > 0) {
                        done.name = allFoodItems[i].name;
                        done.count = allFoodItems[i].quantity;
                        order.push(done);
                    }
                }
                console.log(allFoodItems);
                document.order = order;
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
            total += allFoodItems[i].price * allFoodItems[i].quantity;
        }
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
                <div>
                    <h3>
                        Total
                    </h3>
                    {userRole == 111 &&
                        <h2>
                            $ { totalCount == NaN ? "0" : (totalCount - (totalCount * 0.05)).toFixed(2) }
                        </h2>
                    }
                    {userRole == 11 &&
                        <h2>
                            $ { totalCount == NaN ? "0" : totalCount}
                        </h2>
                    }
                          
                </div>
                {
                    !loggedIn &&
                    <div style={{marginTop: "10%", fontSize: "1.2em", color: "var(--red)"}}>
                        <p>You have to be a registered customer to purchase!</p>
                    </div>
                }
                {loggedIn &&   
                <div>
                    <button className='checkoutPageButton' onClick={() => {placeOrder(1)}}>
                        Pick Up <FiArrowRightCircle className='checkoutArrow'/>
                    </button>
                    <button className='checkoutPageButton' onClick={() => {placeOrder(2)}}>
                        Delivery <FiArrowRightCircle className='checkoutArrow'/>
                    </button>
                </div>
                }
            </div>
        </div>
    );
}