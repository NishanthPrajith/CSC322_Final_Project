import './deliveryProfile.css'
import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../contexts/Authcontext';

import {GoCheck} from 'react-icons/go'

import { Link } from 'react-router-dom';

export default function DeliveryProfile() {

    const [selection, setSelection] = useState(1);
    const [loading, setLoading] = useState(true)

    const { totalSpent, myOrders, userName, userWallet, totalComplaints, totalCompliments, totalReviewCount, demotions, orderDelivered, deliveryOrders, userId, submitOrderBid, userWarnings } = useAuth();
    
    const check = useRef();

    async function submitBid(e, id, index, bids) {
        e.preventDefault();
        console.log(id);
        var a = document.getElementsByClassName("bidInput");
        if (a[index].value == "" || a[index].value == null) {
            alert("Please enter a bid");
        } else if (a[index].value < 1) {
            alert("Please enter a valid bid (bid must be greater than or equal to 1)");
        } else {
            await submitOrderBid(a[index].value, id, bids);
        }
    }

    async function delivered(e, id, bid){
        e.preventDefault();
        console.log(bid);
        await orderDelivered(id, bid);
    }

    useEffect(() => {
        console.log(userId);
        console.log(myOrders);
        
        setLoading(false);
    }, []);

    if (loading) {
        return <div className='Loading'>
        </div>
    }

    return (
        <div className="deliveryProfile">
            <div className="deliveryProfileMainContent">
                <h1>{ userName }</h1>
                <div className="deliveryStats">
                    <div>
                        <p>Complaints</p>
                        <h3>{totalComplaints !== undefined ? totalComplaints : 0}</h3>
                    </div>
                    <div>
                        <p>Compliments</p>
                        <h3>{totalCompliments !== undefined ? totalCompliments : 0}</h3>
                    </div>
                    <div>
                        <p>Bonus</p>
                        {(Math.floor(Math.abs(totalReviewCount / 3)) === 0 || totalReviewCount === undefined) &&
                            <h3>Nothing</h3>
                        }
                        {(Math.floor(totalReviewCount / 3) > 0) &&
                            <h3 style={{color: "green"}}>Bonus</h3>
                        }
                        {(Math.floor(Math.abs(totalReviewCount / 3)) > 0) && totalReviewCount < 0 &&
                            <h3 style={{color: "darkred"}}>Salary Cut</h3>
                        }
                    </div>
                    <div>
                        <p>Demotions</p>
                        <h3>{demotions !== undefined ? demotions : 0}</h3>
                    </div>
                    <div>
                        <p>Warnings</p>
                        <h3>{userWarnings}</h3>
                    </div>
                    <div>
                        <p>Completed Orders</p>
                        <h3>{userWallet}</h3>
                    </div>
                    <div>
                        <p>Total Earned</p>
                        <h3>$ {totalSpent}</h3>
                    </div>
                </div>
                <div className="deliveryProfileButtons">
                    <div onClick={() => {setSelection(1)}} style={selection === 1 ? {backgroundColor: "var(--yellow)"} : {}}>
                        <p>Bidding</p>
                    </div>
                    <div onClick={() => {setSelection(2)}} style={selection === 2 ? {backgroundColor: "var(--yellow)"} : {}}>
                        <p>My Orders</p>
                    </div>
                </div>
                { selection === 1 && 
                    deliveryOrders.map((value, index) => {
                        return (
                            <div className="biddingBoxArea" key={index}>
                                <div className="dishImage"/>
                                <div style={{margin: "4% 6% 4% 0"}}>
                                    <div className="dishHeader">
                                        <h2>Order #{index + 1}</h2>
                                        <h5>{value.orderDate}</h5>
                                    </div>
                                    <div className='deliveryCard'>
                                        <div>
                                            {
                                                value.order.map((v) => {
                                                    return (
                                                        <p>{v.name} x {v.count}</p>
                                                    )
                                                })
                                            }
                                        </div>
                                        {value.bids[userId] === undefined &&
                                        <div style={{display: "flex", flexDirection: "column"}}>
                                            <input id="check" className="bidInput" ref={check} defaultValue={0} min = {0} type="number"/>
                                            <button className={"btnBidSubmit"} onClick={function(e) {submitBid(e, value.orderId, index, value.bids)}}>Submit Bid</button>
                                        </div>}
                                        {
                                            value.bids[userId] !== undefined &&
                                            <div className='bidInput' style={{padding: 0, backgroundColor: "white", display: "flex", flexDirection: "column", textAlign: "center"}}>
                                                <p style={{margin: "0"}}>Your Bid</p>
                                                <p className='bidAmount'>$ {value.bids[userId]}</p>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                {
                    selection === 2 &&
                    myOrders.map((value, index) => {
                        return (
                            <div className="biddingBoxArea" key={index}>
                                <div className="dishImage"/>
                                <div style={{margin: "4% 6% 4% 0"}}>
                                    <div className="dishHeader">
                                        <h2>Order #{index + 1}</h2>
                                        <h5>{value.orderDate}</h5>
                                    </div>
                                    <div className='deliveryCard' style={{marginBottom: "5%"}}>
                                        <div>
                                            {
                                                value.order.map((v) => {
                                                    return (
                                                        <p>{v.name} x {v.count}</p>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div style={{display: "flex", flexDirection: "column"}}>
                                            <p style={{margin: "0"}}>Your Bid</p>
                                            <p className='bidAmount'>$ {value.bids[userId]}</p>
                                        </div>
                                    </div>
                                    {value.orderStatus == true &&
                                    <div style= {{display: 'flex', alignItems: "flex-end", flexDirection: "column-reverse"}}>
                                        <button className='OrderDelivered' onClick = {function(e) {delivered(e, value.orderId, value.bids[userId])}}>
                                            Order Delivered
                                        </button>
                                    </div>
                                    }   
                                    {value.orderStatus == false &&
                                        <div className="deliveryFinal">
                                            <div style= {{display: 'flex', alignItems: "flex-end", flexDirection: "row"}}>
                                                <div className='OrderReview additionalStyle'>
                                                    <button> 
                                                        {!value.deliveryPersonReviewed ?
                                                            <Link to = {"/deliveryOrderReview/" + index}>
                                                                Review Order
                                                            </Link> :
                                                            <p style = {{margin: "0%"}}>Order Reviewed</p>
                                                        }   
                                                    </button>
                                                </div>
                                                <button className='OrderDelivered' style = {{backgroundColor: "lightgreen"}}>
                                                    Delivered <GoCheck style={{marginLeft: "2%"}}/>
                                                </button>
                                            </div>
                                        </div>
                                    }
                                    {
                                        value.memo !== undefined &&
                                        <div style={{display: "flex", marginTop: "5%", flexDirection: "column"}}>
                                            <h3 style={{margin: "0", color: "var(--red)"}}>Memo</h3>
                                            <p style={{margin: "1.5% 0 0 0", fontSize: "0.9em"}}>{value.memo}</p>
                                        </div>
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}