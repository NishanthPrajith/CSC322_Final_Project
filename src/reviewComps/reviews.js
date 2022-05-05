import './reviews.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFood } from '../contexts/foodContext';

export default function Reviews() {
    
    const {id} = useParams();

    const [reviews, setAllReviews] = useState([]);

    const { getReviews, allReviews } = useFood();

    useEffect(() => {
        const fetchAPI = async () => { 
            await getReviews(id);
            setAllReviews(allReviews);
        };
        fetchAPI();
        console.log(allReviews);
    }, []);

    function goBack(e) {
        e.preventDefault();
        window.history.back();
    }

    return (
        <div className='Reviews'>
            <button className="goBackReviews" onClick={(e) => goBack(e)}>Go Back</button>
            {allReviews.length === 0 && <h3>No reviews yet</h3> }
            {allReviews.map((item, index) => {
                return (
                    <div className="reviewCard">
                        <div>
                            <h3>"{ item.review }"</h3>
                        </div>
                        <div>
                            <p style={{color: "var(--yellow)"}}>{ item.rating }</p>
                            <p>{ item.userName }</p>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}