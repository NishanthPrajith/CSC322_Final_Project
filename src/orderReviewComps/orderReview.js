import { useParams } from "react-router-dom";
import './orderReview.css';
import { useAuth } from "../contexts/Authcontext";
import { useState, useEffect, useRef } from "react";
import { useFood } from "../contexts/foodContext";

export default function OrderReview() {
    const {id} = useParams();

    const [specificOrder, setOrder] = useState([]);
    const [dishes, setDishes] = useState([]);

    const {orders, userName, submitDishReview, submitDeliveryReview, updateChefs, updateDelivery} = useAuth();

    const { updateRatings } = useFood();

    const rating = useRef(0);

    async function submitReview(e) {
        e.preventDefault();

        var n = e.target.length;

        if (specificOrder.state === 2) {
            var i = n - 2;
            var j = n - 3;
            console.log(j);
            console.log(i);
            var reviewType = e.target[j].value;
            var reviewMessage = e.target[i].value;
            n -= 3;
            await submitDeliveryReview(reviewType, reviewMessage, specificOrder.orderId);
            await updateDelivery(reviewType, specificOrder.deliveryUserId);
        }

        var dish = {};
        var allInfo = [];


        for (var i = 0; i < n; i++) {
            if (i % 3 === 0) {
                dish['rating'] = e.target[i].value;
                console.log(dish);
            } else if (i % 3 === 1) {
                dish['ratingType'] = e.target[i].value;
                console.log(dish);
            } else {
                dish['review'] = e.target[i].value;
                dish['dishId'] = dishes[Math.floor(i / 3)].dishId;
                dish['userName'] = userName;
                console.log(dish);
                allInfo.push(dish);
                dish = {};
                console.log(allInfo);
            }
        } 
        await updateRatings(allInfo);
        await submitDishReview(allInfo, specificOrder.orderId);
        await updateChefs(allInfo);
        
        alert("Review submitted");
        window.history.back();
    }
    

    useEffect(() => {
        console.log(orders);
        console.log("Order review");
        setOrder(orders[id]);
        setDishes(orders[id].order);
        console.log(dishes);
    }, [orders]);

    function goBack(e) {
        e.preventDefault();
        window.history.back();
    }

    return (
        <div className="orderReview">
            <button className="goBackReviews" onClick={(e) => goBack(e)}>Go Back</button>
            <h2>Review Order</h2>
            <form onSubmit={(e) => {submitReview(e)} }>
                {
                    dishes.map((dish, index) => {
                        return (
                            <div className="dishRating">
                                <div className="individualDishReview">
                                    <div>
                                        <p>Rating : </p>
                                        <input ref = {rating} required type="number" name="rating" min ="1" max = "5" placeholder="Enter Rating" />
                                    </div>
                                    <div style={{display: "flex", justifyContent: "flex-end", width: "100%"}}>
                                        <div style={{width: "46%", float: "right"}}>
                                            <p>Complaint / Complement : </p>
                                            <select required>
                                                <option>Complaint</option>
                                                <option>Compliment</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p>Review : </p>
                                    <textarea required name="chefComplaint" rows = "6">
                                    </textarea>
                                </div>
                            </div>
                        )
                    })
                }

                {specificOrder.deliveryPersonReviewed && 
                    <div>
                        <h3>Delivery Person feedback</h3>
                        <p><strong>Review</strong> : {specificOrder.deliveryPersonReview}</p>
                    </div>
                }
                {
                    specificOrder.state == 2 && 
                    <div className="dishRating">
                        <div className="individualDishReview">
                            <div style={{width: "80%", float: "right"}}>
                                <p>Complaint / Complement Delivery : </p>
                                <select required>
                                    <option>Complaint</option>
                                    <option>Compliment</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <p>Delivery Person Review : </p>
                            <textarea required name="chefComplaint" rows = "6">
                            </textarea>
                        </div>
                    </div>
                }
                <div style={{display: "flex", justifyContent: "end", width: "100%"}}>
                    <button style = {{width: "20%"}} className="goBackReviews">Submit Review</button>
                </div>
            </form>
        </div>
    );
}
