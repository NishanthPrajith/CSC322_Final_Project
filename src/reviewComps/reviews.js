import './reviews.css';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Reviews() {
    
    const {id} = useParams();

    useEffect(() => {
        console.log(id);
    });

    const item = {
        name : "Nishanth",
        rating : 3.5,
        review : "This is a review",
    }

    function goBack(e) {
        e.preventDefault();
        window.history.back();
    }

    return (
        <div className='Reviews'>
            <button className="goBackReviews" onClick={(e) => goBack(e)}>Go Back</button>
            <div className="reviewCard">
                <div>
                    <h3>"{ item.review }"</h3>
                </div>
                <div>
                    <p style={{color: "var(--yellow)"}}>{ item.rating }</p>
                    <p>{ item.name }</p>
                </div>
            </div>
        </div>
    )
}