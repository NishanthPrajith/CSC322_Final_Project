import './deliveryProfile.css'
import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../contexts/Authcontext';

export default function DeliveryProfile() {

    const [selection, setSelection] = useState(true);
    const [values, setValues] = useState([]);
    const [loading, setLoading] = useState(true)

    const { totalSpent, userWallet, deliveryOrders, getDeliveryOrders, userWarnings } = useAuth();
    
    const check = useRef();

    function submitBid(e, id, index) {
        e.preventDefault();
        console.log(id);
        var a = document.getElementsByClassName("bidInput");
        console.log(a[index].value);
        getDeliveryOrders();
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
                                        <h2>Order #2342342</h2>
                                        <h5>1/1/2022</h5>
                                    </div>
                                    <div className='deliveryCard'>
                                        <div>
                                            <p>pizza x {1}</p>
                                            <p>pizza x {1}</p>
                                            <p>pizza x {1}</p>
                                        </div>
                                        <div style={{display: "flex", flexDirection: "column"}}>
                                            <input id="check" className="bidInput" ref={check} defaultValue={0} type="number"/>
                                            <button className={"btnBidSubmit"} onClick={function(e) {submitBid(e, 1, index)}}>Submit Bid</button>
                                        </div>
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