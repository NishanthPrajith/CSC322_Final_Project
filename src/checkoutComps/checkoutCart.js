import './checkoutCart.css';
import { FiArrowRightCircle } from "react-icons/fi";

export default function CheckoutCart() {
    var information = [
        {
            "name": "Apple",
            "price": "$1.00",
            "quantity": "1",
        },
        {
            "name": "Apple",
            "price": "$1.00",
            "quantity": "1",
        },
        {
            "name": "Apple",
            "price": "$1.00",
            "quantity": "1",
        },
        {
            "name": "Apple",
            "price": "$1.00",
            "quantity": "1",
        },
        {
            "name": "Apple",
            "price": "$1.00",
            "quantity": "1",
        }

    ];
    return (
        <div className="checkout-cart">
            <h1 className="checkoutPageHeading">Review Your Cart</h1>
            <div style = {{margin: "0 1%"}}>
            {
                information.map((item) => {
                    return (
                        <div className="checkoutItem">
                            <div className="checkoutItemDes">
                                <h3>{item.name}</h3>
                            </div>
                            <div className="checkoutItemPrice">
                                <h4>{item.price} </h4>
                                <span>X</span>
                                <p>{item.quantity}</p>
                            </div>
                        </div>
                    );
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
                        $ 100.00
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