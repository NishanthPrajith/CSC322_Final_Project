import './discussion.css';
import { useAuth } from '../contexts/Authcontext';
import { useEffect, useState } from 'react';
import { useRef } from 'react';

export default function Discussion() {

    return (
        
        <div className='discussionForum'>
            <div style={{marginTop: "7%"}}>
                <h2>Discussion Forum</h2>
                <div className='UserOrderCard'>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                                    <h2>Dish Name</h2>
                                    <h2>Chef Name</h2>
                                    <h5>Complaint posted date</h5>
                    </div>
                    <div className='rating'>
                        <label>Rating : "Dish rating" </label>
                    </div>
                    <h4> User_name: </h4>
                    <div className='userCardInner'>
                        <p> The food was great! </p>
                    </div>
                    <div className='dispute'>
                        <button>
                            Dispute
                        </button>
                    </div>
                    <div className='OrderRatingForm'>
                        <form>
                            <div>
                                <label>Dispute :   </label>
                                <textarea rows = "4" defaultValue="Write your dispute here...">
                                </textarea>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

                <div className='UserOrderCard'>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                                    <h2>Dish Name</h2>
                                    <h2>Chef Name</h2>
                                    <h5>Complaint posted date</h5>
                    </div>
                    <div className='rating'>
                        <label>Rating : "Dish rating" </label>
                    </div>
                    <h4> User_name: </h4>
                    <div className='userCardInner'>
                        <p> The food was bad!</p>
                    </div>
                    <div className='dispute'>
                        <button>
                            Dispute
                        </button>
                    </div>
                    <div className='OrderRatingForm'>
                        <form>
                            <div>
                                <label>Dispute :   </label>
                                <textarea rows = "4" defaultValue="Write your dispute here...">
                                </textarea>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='UserOrderCard'>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                                    <h2>Delivery Personnel Name</h2>
                                    <h5>Complaint posted date</h5>
                    </div>
                    <div className='rating'>
                        <label>Rating : "Dish rating" </label>
                    </div>
                    <h4> User_name: </h4>
                    <div className='userCardInner'>
                        <p> The delivery person did not take good care of my food, my pizza was rolled up!</p>
                    </div>
                    <div className='dispute'>
                        <button>
                            Dispute
                        </button>
                    </div>
                    <div className='OrderRatingForm'>
                        <form>
                            <div>
                                <label>Dispute :   </label>
                                <textarea rows = "4" defaultValue="Write your dispute here...">
                                </textarea>
                            </div>
                        </form>
                    </div>
                </div>
                
            </div>

    )
}
    