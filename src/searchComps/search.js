import './search.css';

import { useFood } from "../contexts/foodContext";
import { useEffect, useState } from 'react';

import { RiAddFill, RiSubtractFill } from "react-icons/ri";

export default function MainSearch() {

    const { filteredFoodItems, changeFlilteredFoodItems } = useFood();
    const [loading, setLoading] = useState(true);

    if (loading) {
        if (filteredFoodItems.length > 0) {
            setLoading(false);
        }
        return <div className='Loading'>
        </div>
    }

    async function addToCartAdd(id) {
        console.log(id);
        var temp = filteredFoodItems;
        temp[id].quantity += 1;
        setLoading(true);
        changeFlilteredFoodItems(temp);
    }

    function addToCartSubtract(id) {
        console.log(id);
        var temp = filteredFoodItems;
        temp[id].quantity = temp[id].quantity == 0 ? 0 : temp[id].quantity - 1;
        setLoading(true);
        changeFlilteredFoodItems(temp);
    }

    return (
        <div className='search'>
            <div>
                <p className="searchHeading">Highest Rated Dishes</p>
                <div className='recommendedUI'>
                    <div className="recommendedLeftSide">
                        <div>
                            <p>Temp</p>
                        </div>
                        <div>
                            <h3>Done</h3>
                            <p style={{fontSize: "0.9em"}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, suscipit voluptatum minima, debitis tempore labore ab cumque maiores culpa quisquam iste cum consectetur tempora recusandae maxime qui earum, ratione adipisci.</p>
                            <div className="cardSeperation">
                                <div>
                                    <h5>Rating</h5>
                                    <p>3.5</p>
                                </div>
                                <div>
                                    <h5>Price</h5>
                                    <p>$10</p>
                                </div>
                                <div>
                                    <h5>Quantity</h5>
                                    <div className='quantity'>
                                        <RiSubtractFill />
                                        <p>1</p>
                                        <RiAddFill />
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='recommendedRightSide'>
                        <div className="recommendRightTop">
                            <div>
                                <p>Temp Image</p>
                            </div>
                            <div>
                                <h3>Done</h3>
                                <p style={{fontSize: "0.8em"}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, suscipit voluptatum minima, debitis tempore labore ab cumque maiores culpa quisquam iste cum consectetur tempora recusandae maxime qui earum, ratione adipisci.</p>
                                <div className="cardSeperationRight">
                                    <div>
                                        <h5>Rating</h5>
                                        <p>3.5</p>
                                    </div>
                                    <div>
                                        <h5>Price</h5>
                                        <p>$10</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="recommendRightBottom">
                            <div>
                                <p>Temp Image</p>
                            </div>
                            <div>
                                <h3>Done</h3>
                                <p style={{fontSize: "0.8em"}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, suscipit voluptatum minima, debitis tempore labore ab cumque maiores culpa quisquam iste cum consectetur tempora recusandae maxime qui earum, ratione adipisci.</p>
                                <div className="cardSeperationRight">
                                    <div>
                                        <h5>Rating</h5>
                                        <p>3.5</p>
                                    </div>
                                    <div>
                                        <h5>Price</h5>
                                        <p>$10</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p className="searchHeading">Popular Dishes</p>
                <div className='recommendedUI'>
                    <div className="recommendedLeftSide">
                        <div>
                            <p>Temp Image</p>
                        </div>
                        <div>
                            <h3>done</h3>
                            <p style={{fontSize: "0.9em"}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, suscipit voluptatum minima, debitis tempore labore ab cumque maiores culpa quisquam iste cum consectetur tempora recusandae maxime qui earum, ratione adipisci.</p>
                            <div className="cardSeperation">
                                <div>
                                    <h5>Rating</h5>
                                    <p>3.5</p>
                                </div>
                                <div>
                                    <h5>Price</h5>
                                    <p>$10</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='recommendedRightSide'>
                        <div className="recommendRightTop">
                            <div>
                                <p>Temp Image</p>
                            </div>
                            <div>
                                <h3>Done</h3>
                                <p style={{fontSize: "0.8em"}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, suscipit voluptatum minima, debitis tempore labore ab cumque maiores culpa quisquam iste cum consectetur tempora recusandae maxime qui earum, ratione adipisci.</p>
                                <div className="cardSeperationRight">
                                    <div>
                                        <h5>Rating</h5>
                                        <p>3.5</p>
                                    </div>
                                    <div>
                                        <h5>Price</h5>
                                        <p>$10</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="recommendRightBottom">
                            <div>
                                <p>Temp Image</p>
                            </div>
                            <div>
                                <h3>Done</h3>
                                <p style={{fontSize: "0.8em"}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, suscipit voluptatum minima, debitis tempore labore ab cumque maiores culpa quisquam iste cum consectetur tempora recusandae maxime qui earum, ratione adipisci.</p>
                                <div className="cardSeperationRight">
                                    <div>
                                        <h5>Rating</h5>
                                        <p>3.5</p>
                                    </div>
                                    <div>
                                        <h5>Price</h5>
                                        <p>$10</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p className="searchHeading">Search Results..</p>
                <div className='filteredResultsUI'>
                {
                    filteredFoodItems.map((item, index) => {
                        return (
                            <div className="recommendedLeftSideMain" key = {index}>
                                <div>
                                    <p>Temp Image</p>
                                </div>
                                <div>
                                    <h3>{item.name}</h3>
                                    <p style={{fontSize: "0.9em", margin: "7% 0 10% 0"}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, suscipit voluptatum minima, debitis tempore labore ab cumque maiores culpa quisquam iste cum consectetur tempora recusandae maxime qui earum, ratione adipisci.</p>
                                    <div className="cardSeperation">
                                        <div>
                                            <h5>Rating</h5>
                                            <p>3.5</p>
                                        </div>
                                        <div>
                                            <h5>Price</h5>
                                            <p>$10</p>
                                        </div>
                                        <div>
                                            <h5>Quantity</h5>
                                            <div className='quantity'>
                                                <button onClick={() => {addToCartSubtract(index)}}>
                                                    <RiSubtractFill />
                                                </button>
                                                <p>{item.quantity}</p>
                                                <button onClick={() => {addToCartAdd(index)}}>
                                                    <RiAddFill />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </div>
    )
  }
  