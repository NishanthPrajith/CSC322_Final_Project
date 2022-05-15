import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/Authcontext';
import { useFood } from '../contexts/foodContext';
import './seeBids.css';

export default function SeeBids() {
    
    const {id} = useParams();

    const [bids, setBids] = useState([]);

    const { allBids, getBids, deliveryPeople } = useFood();

    const { setDeliveryPerson } = useAuth();

    
    const [information, setinfo] = useState([]); 

    var memo = useRef();

    useEffect(() => {
        const fetchAPI = async () => { 
            await getBids(id);
            console.log(allBids);
            setBids(allBids);

        };
        fetchAPI();
        setBids(allBids);
    }, []);

    function goBack(e) {
        e.preventDefault();
        window.history.back();
    }


    function pickDelivery(e, chosenId, chosenBid) {
        e.preventDefault();

        var check = false;
        for(var i = 0; i < allBids.length; i++) {
            if(allBids[i].bid < chosenBid) {
                check = true;
            }
        }

        if (check) {
            var temp = [chosenId];
            setinfo(temp);
            document.getElementsByClassName("memo")[0].style.display = "flex";
        } else {
            setDeliveryPerson(id, chosenId, "", deliveryPeople);
            goBack(e);
        }

        
    }

    function submitMemo(e) {
        setDeliveryPerson(id, information[0], memo.current.value, deliveryPeople);
        memo.current.value = "Enter reason here.";
        closeMemo(e);
        goBack(e);
    }

    function closeMemo(e) {
        document.getElementsByClassName("memo")[0].style.display = "none";
    }

    function getName(id) {
        for (let j = 0; j < deliveryPeople.length; j++) {
            if (id === deliveryPeople[j].id) {
                return deliveryPeople[j].name;
            }
        }
    }


    return (
        <div className='Reviews'>
            <div className='memo' id = "memo">
                <div>
                    <h1>Memo</h1>
                    <div className='memoBox'>
                        <label>Reason</label>
                        <textarea ref = {memo} style={{resize : "none", marginTop: "2%"}} rows="10" cols="70" defaultValue={"Enter reason here."}>
                        </textarea>
                    </div>
                    <div className='memoBox'>
                        <button onClick={function(e) {submitMemo(e)}}>Submit Memo</button>
                        <button onClick={function(e) {closeMemo(e)}}>Close</button>
                    </div>
                </div>
            </div>
            <button className="goBackReviews" onClick={(e) => goBack(e)}>Go Back</button>
            {allBids.length === 0 && <h3>No Bids yet</h3> }
            {allBids.map((item, index) => {
                return (
                    <div className="bidCard">
                        <div>
                            <h3>{getName(item.deliveryId)} Bid : <span style={{color: "green"}}>${item.bid}</span></h3>
                        </div>
                        <div>
                            <button onClick={(e) => pickDelivery(e, item.deliveryId, item.bid)} style = {{width: "90%", padding: "12% 0"}} className="goBackReviews">Choose this bid</button>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}