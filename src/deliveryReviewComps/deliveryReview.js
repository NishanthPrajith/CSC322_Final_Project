import './deliveryReview.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { useAuth } from '../contexts/Authcontext';

export default function DeliveryReview() {
    const {id} = useParams();

    const [specificOrder, setOrder] = useState([]);

    const { myOrders, addDeliveryPersonReview } = useAuth();

    function goBack(e) {
        e.preventDefault();
        window.history.back();
    }

    async function submitDeliveryPersonReview(e) {
        e.preventDefault();
        var message = e.target[0].value;
        await addDeliveryPersonReview(message, specificOrder.orderId);
        console.log(e);
        alert("Review submitted!");
        window.history.back();
    }

    useEffect(() => {
        setOrder(myOrders[id]);
    }, [myOrders]);

    return (
        <div className='Reviews'>
            <button className="goBackReviews" onClick={(e) => goBack(e)}>Go Back</button>
            {specificOrder.userReviewed && 
                <div>
                    <h3>Customer feedback</h3>
                    <p><strong>Category</strong> : {specificOrder.deliveryType}</p>
                    <p><strong>Review</strong> : {specificOrder.deliveryReview}</p>
                </div>
            }
            <form onSubmit={(e) => submitDeliveryPersonReview(e)}>
                <div className='dishRating'>
                    <p>Your Customer Review : </p>
                    <textarea required name="chefComplaint" rows = "6">
                    </textarea>
                </div>
                <div style={{display: "flex", justifyContent: "end", width: "100%"}}>
                    <button style = {{width: "20%"}} className="goBackReviews">Submit Delivery Review</button>
                </div>
            </form>
        </div>
    );
}