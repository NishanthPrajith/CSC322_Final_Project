import './checkoutCart.css';
import { FiArrowRightCircle } from "react-icons/fi";

import { useFood } from '../contexts/foodContext';
import { useState } from 'react';

export default function CheckoutCart() {
    
    var { allFoodItems } = useFood();
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
                    <h3>
                        Total
                    </h3>
                    <h2>
                        $ { totalCount == NaN ? "0" : totalCount }
                    </h2>
                </div>
                <div>
                    <button className='checkoutPageButton'>
                        Pick Up <FiArrowRightCircle className='checkoutArrow'/>
                    </button>
                    <button className='checkoutPageButton'>
                        Delivery <FiArrowRightCircle className='checkoutArrow'/>
                    </button>
                </div>
            </div>
        </div>
    );
}