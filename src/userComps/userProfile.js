import './userProfile.css';
import './previousOrders';
import PreviousOrders from './previousOrders';
import { useAuth } from '../contexts/Authcontext';
import { useEffect, useState } from 'react';
import { useRef } from 'react';

export default function UserProfile() {

    const { orders, writeOrderReviewUser } = useAuth();
    const [orderChoice, setOrderChoice] = useState(-1);

    const rating = useRef();
    const chefRating = useRef();
    const deliveryRating = useRef();


    function changeOrderChoice(i) {
        if (orderChoice === i) {
            setOrderChoice(-1);
        } else {
            setOrderChoice(i);
        }
    }

    async function formSubmission(event, id, state) {
        event.preventDefault();
        var a = rating.current.value;
        var b = chefRating.current.value;
        if (state == 2) {
            var c = deliveryRating.current.value;
        } else {
            var c = "";
        }
        if (a < 0 || a > 5 || a === "") {
            alert("Please enter a rating between 0 and 5!");
        } else {
            await writeOrderReviewUser(id, a, b, c);
            alert("Thank you for your rating!");
        }
    }

    var done = [1, 2, 3, 4, 5];
    
    useEffect(() => {
        console.log(typeof done);
        console.log(done);
        console.log(orders);
    }, []);

    return (
        <div className='userProfile'>
            <h1 className = "userProfileTitle">User Profile</h1>
            <div>
                {
                orders.map((item, i) => {
                    return (
                        <div className='UserOrderCard' key={i}>
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <h2>Order #{i + 1}</h2>
                                <h5>{item.orderDate}</h5>
                            </div>
                            <div className='userCardInner'>
                                <div>
                                    {
                                        item.order.map((v) => {
                                            return (
                                                <p><strong>{v.name}</strong> x {v.count}</p>
                                            )
                                        })
                                    }
                                </div>
                                <div>
                                    <h3>${item.totalPrice}</h3>
                                </div>
                            </div>
                            <div className='OrderReview'>
                                <button onClick={() => {changeOrderChoice(i)}}>
                                    {!item.reviewed ? "Review Order" : "Order Reviewed"}
                                </button>
                            </div>
                            {
                                orderChoice === i &&
                                <div className='OrderRatingForm'>
                                    <form onSubmit={() => {return false;}}>
                                        <div>
                                            <label>Rating :   </label>
                                            {!item.reviewed &&
                                                <input type="number" ref= {rating} name="rating" min ="0" max = "5" placeholder="Enter Rating" />
                                            } {item.reviewed &&
                                                <p style = {{width: "10%", textAlign: "center", backgroundColor: "var(--white)", padding: "0.5% 1%", borderRadius: "15px"}}>{item.rating}</p>    
                                            }
                                        </div>
                                        <label>Chef Complaint :   </label>
                                        {!item.reviewed &&
                                            <textarea ref= {chefRating} name="chefComplaint" rows = "4" defaultValue="Write your complaint for the chef here...">
                                            </textarea>
                                        } {item.reviewed &&  
                                            <p style = {{backgroundColor: "var(--white)", padding: "0.5% 1%", borderRadius: "15px"}}>{item.chefReview}</p>
                                        }   
                                        {(item.state == 2) && <label>Delivery Complaint :   </label>}
                                            {!item.reviewed && (item.state == 2) &&
                                                <textarea ref={deliveryRating} name="deliveryComplaint" rows = "4" defaultValue = "Write your complaint for the delivery here...">
                                                </textarea>
                                            } {item.reviewed && (item.state == 2) &&  
                                                <p style = {{backgroundColor: "var(--white)", padding: "0.5% 1%", borderRadius: "15px"}}>{item.deliveryReview}</p>
                                            }
                                        {!item.reviewed &&
                                        <button onClick={function(e) {formSubmission(e, item.orderId, item.state)}}>Submit</button>}
                                    </form>
                                </div>
                            }
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}