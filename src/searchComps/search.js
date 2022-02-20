import './search.css';

import { useFood } from "../contexts/foodContext";
import { useEffect, useState } from 'react';

export default function MainSearch() {

    const { filteredFoodItems } = useFood();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log(filteredFoodItems);
    }, []);

    if (loading) {
        if (filteredFoodItems.length > 0) {
            setTimeout(() => {console.log("this is the first message")}, 5000);
            setLoading(false);
        }
        return <div className='Loading'>
        </div>
    }

    return (
        <div className='search'>
            <div>
                <p className="searchHeading">Highest Rated Dishes</p>
                <div className='recommendedUI'>
                    <div className="recommendedLeftSide">
                        <div>
                            <p>Temp Image</p>
                        </div>
                        <div>
                            <h3>{ filteredFoodItems[0].name }</h3>
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
                    filteredFoodItems.map((item) => {
                        return (
                            <div className="recommendedLeftSideMain">
                                <div>
                                    <p>Temp Image</p>
                                </div>
                                <div>
                                    <h3>{item.name}</h3>
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
                        )
                    })
                }
                </div>
            </div>
        </div>
    )
  }
  