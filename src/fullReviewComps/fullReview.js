
import './fullReview.css';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/Authcontext';
import { useParams } from 'react-router-dom';

export default function FullReview() {

    
    const [reviews, setAllReviews] = useState([]);

    const { id } = useParams();
    
    const { getComplaints, closeComplaint, giveDeliveryWarning, giveUserWarning } = useAuth();

    useEffect(() => {
        const fetchAPI = async () => {
            setAllReviews(getComplaints[id]);
        };
        fetchAPI();
    }, []);

    function goBack(e) {
        e.preventDefault();
        window.history.back();
    }

    async function punish(whom) {
        if (whom === "user") {
            await giveUserWarning(reviews.userId);
        } else if (whom === "delivery") {
            await giveDeliveryWarning(reviews.deliveryUserId);
        } else if (whom === "both") {
            await giveDeliveryWarning(reviews.deliveryUserId);
            await giveUserWarning(reviews.userId);
        } 
        await closeComplaint(reviews.orderId);
        alert("Case Handled");
        window.history.back();
    }

    return (
        <div className="Reviews">
            <button className="goBackReviews" onClick={(e) => goBack(e)}>Go Back</button>
            {!reviews.userReviewed && !reviews.deliveryReviewed && <h3>No Reviews Yet</h3>}
            {reviews.userReviewed &&
                <div>
                    <h3>Customer's Review</h3>
                    <p><strong>Review Category</strong> : {reviews.deliveryType}</p>
                    <p><strong>Review</strong> : {reviews.deliveryReview}</p>
                </div>
            }
            {reviews.deliveryPersonReviewed &&
                <div style={{marginTop: "4%"}}>
                    <h3>Delivery Person's Review</h3>
                    <p><strong>Review</strong> : {reviews.deliveryPersonReview}</p>
                </div>
            }
            {(reviews.userReviewed || reviews.deliveryPersonReviewed) &&
                <div className='punishChoices'>
                    <button onClick={(e) => punish("user")}>Give Warning to Customer</button>
                    <button onClick={(e) => punish("delivery")}>Give Warning to Delivery Person</button>
                    <button onClick={(e) => punish("both")}>Give Warning to Both Parties</button>
                    <button onClick={(e) => punish("")}>No Warnings</button>
                </div>
            }
        </div>
    );
}