import './bidding.css'

export default function Bidding() {

    async function bid(event) {

    }

    return (
        <div className='Bidding'>
            <div className='biddingBox'>
                <div className="biddingBoxArea">
                    <div className="dishImage"/>
                    <div style={{margin: "4% 6% 4% 0"}}>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <h2>Order #2342342</h2>
                            <h5>1/1/2022</h5>
                        </div>
                        <div className='userCardInner'>
                            <div>
                                <p>pizza x 1</p>
                            </div>
                            <div>
                                <div>
                                     <input className="bidInput" type="text" placeholder="Bid Amount" autoComplete="off" size="11" maxLength="10" value="" aria-describedby="w1-17-_mtb"/>
                                </div>
                                <button className={"btnBidSubmit"}>Submit Bid</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}