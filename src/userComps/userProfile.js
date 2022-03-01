import './userProfile.css';
import './previousOrders';
import PreviousOrders from './previousOrders';
import { useAuth } from '../contexts/Authcontext';
import { useEffect, useState } from 'react';

export default function UserProfile() {

    const { orders } = useAuth();
    const [orderChoice, setOrderChoice] = useState(-1);

    function changeOrderChoice(i) {
        if (orderChoice === i) {
            setOrderChoice(-1);
        } else {
            setOrderChoice(i);
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
                            <h2>Order #{i + 1}</h2>
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
                                    Review Order
                                </button>
                            </div>
                            {
                                orderChoice === i &&
                                <div className='OrderRatingForm'>
                                    <form onSubmit={() => {return false;}}>
                                        <div>
                                            <label for="rating">Rating :   </label>
                                                <input type="number" name="rating" min ="0" max = "5" placeholder="Enter Rating" />
                                        </div>
                                        <label for="rating">Chef Complaint :   </label>
                                            <textarea name="chefComplaint" rows = "4">
                                                Write your complaint for the chef here...
                                            </textarea>
                                        <label for="rating">Delivery Complaint :   </label>
                                            <textarea name="deliveryComplaint" rows = "4">
                                                Write your complaint for the delivery here...
                                            </textarea>
                                        <button>Submit</button>
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