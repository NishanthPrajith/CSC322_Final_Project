import './checkoutCart.css';
import { FiArrowRightCircle } from "react-icons/fi";

import { useFood } from '../contexts/foodContext';
import { useState } from 'react';
import { useAuth } from '../contexts/Authcontext';

export default function CheckoutCart() {
    
    var { allFoodItems } = useFood();
    var { loggedIn } = useAuth();

    const [loading, setLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0.00);

    function calculateTotal() {
        var total = 0.00;
        for (var i = 0; i < allFoodItems.length; i++) {
            total += allFoodItems[i].price * allFoodItems[i].quantity;
        }
        console.log(total); 
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
                <div>
                    <h4>VIP Discount</h4>
                    <div>
                        <p>-$ {totalCount == NaN ? "0" : totalCount * 0.05}</p>
                    </div>
                </div>
                <div>
                    <h3>
                        Total
                    </h3>
                    <h2>
                        $ { totalCount == NaN ? "0" : totalCount - (totalCount * 0.05)}
                    </h2>
                </div>
                {
                    !loggedIn &&
                    <div style={{marginTop: "10%", fontSize: "1.2em", color: "var(--red)"}}>
                        <p>You have to be a registered customer to purchase!</p>
                    </div>
                }
                { loggedIn &&   
                <div>
                    <button className='checkoutPageButton'>
                        Pick Up <FiArrowRightCircle className='checkoutArrow'/>
                    </button>
                    <button className='checkoutPageButton'>
                        Delivery <FiArrowRightCircle className='checkoutArrow'/>
                    </button>
                </div>
                }
            </div>
        </div>
    );
}