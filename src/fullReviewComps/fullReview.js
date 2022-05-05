
import './fullReview.css';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/Authcontext';
import { useParams } from 'react-router-dom';

export default function FullReview() {

    
    const [reviews, setAllReviews] = useState([]);

    const { id } = useParams();
    
    const { deliveryOrders } = useAuth();

    useEffect(() => {
        const fetchAPI = async () => {
            setAllReviews(deliveryOrders[id]);
        };
        fetchAPI();
    }, []);

    function goBack(e) {
        e.preventDefault();
        window.history.back();
    }

    return (
        <div className="Reviews">
            <button className="goBackReviews" onClick={(e) => goBack(e)}>Go Back</button>
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
        </div>
    );
}