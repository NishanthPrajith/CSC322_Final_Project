import './deliveryProfile.css'
import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../contexts/Authcontext';

export default function DeliveryProfile() {

    const [selection, setSelection] = useState(true);
    const [values, setValues] = useState([]);
    const [loading, setLoading] = useState(true)

    const { totalSpent, userWallet, deliveryOrders, userId, submitOrderBid, userWarnings } = useAuth();
    
    const check = useRef();

    var test = {"name": 10};

    async function submitBid(e, id, index, bids) {
        e.preventDefault();
        console.log(id);
        var a = document.getElementsByClassName("bidInput");
        console.log(a[index].value);
        await submitOrderBid(a[index].value, id, bids);
    }

    useEffect(() => {
        console.log(typeof deliveryOrders);
        var temp = values;
        console.log(deliveryOrders);
        for (var i = 0; i < deliveryOrders.length; i++) {
            temp.push(deliveryOrders[i]);
        }
        setValues(temp);
        setLoading(false);
    }, []);

    if (loading) {
        return <div className='Loading'>
        </div>
    }

    return (
        <div className="deliveryProfile">
            <div className="deliveryProfileMainContent">
                <h1>Nishanth Prajith</h1>
                <div className="deliveryStats">
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
                    <div onClick={() => {setSelection(true)}} style={selection ? {backgroundColor: "var(--yellow)"} : {}}>
                        <p>Bidding</p>
                    </div>
                    <div onClick={() => {setSelection(false)}} style={!selection ? {backgroundColor: "var(--yellow)"} : {}}>
                        <p>Orders</p>
                    </div>
                </div>
                { selection && 
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
                                        {value.bids[userId] ===  undefined &&
                                        <div style={{display: "flex", flexDirection: "column"}}>
                                            <input id="check" className="bidInput" ref={check} defaultValue={0} type="number"/>
                                            <button className={"btnBidSubmit"} onClick={function(e) {submitBid(e, value.orderId, index, value.bids)}}>Submit Bid</button>
                                        </div>}
                                        {
                                            value.bids[userId] !== undefined &&
                                            <div style={{display: "flex", flexDirection: "column"}}>
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
            </div>
        </div>
    )
}