import './search.css';

import { useFood } from "../contexts/foodContext";
import { useEffect, useState } from 'react';

import { RiAddFill, RiSubtractFill } from "react-icons/ri";

export default function MainSearch() {

    const { filteredFoodItems, changeFlilteredFoodItems, changeHighestRatedDishes, highestRated } = useFood();
    const [loading, setLoading] = useState(true);

    if (loading) {
        if (filteredFoodItems.length > 0) {
            setLoading(false);
            console.log("-------");
            console.log(filteredFoodItems);
            console.log("-------");
            console.log(highestRated);
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

    function getImage(imageName) {
        var a = "url('" + imageName + "')";
        return a;
    }

    function modifiedAddToCart(name, price, index) {
        var temp = 0;
        for (let i = 0; i < filteredFoodItems.length; i++) {
            if (filteredFoodItems[i].name === name && filteredFoodItems[i].price === price) {
                temp = i;
                break;
            }
        }
        changeHighestRatedDishes(index, 1);
        addToCartAdd(temp);
    }

    function modifiedSubtractToCart(name, price, index) {
        var temp = 0;
        for (let i = 0; i < filteredFoodItems.length; i++) {
            if (filteredFoodItems[i].name === name && filteredFoodItems[i].price === price) {
                temp = i;
                break;
            }
        }
        changeHighestRatedDishes(index, 2);
        addToCartSubtract(temp);
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
                        <div className="dishImage">
                        </div>
                        <div>
                            <h3>{highestRated[0].name}</h3>
                            <p style={{fontSize: "0.9em"}}>{highestRated[0].description}</p>
                            <div className="cardSeperation">
                                <div>
                                    <h5>Rating</h5>
                                    <p>{highestRated[0].rating}</p>
                                </div>
                                <div>
                                    <h5>Price</h5>
                                    <p>${highestRated[0].price}</p>
                                </div>
                                <div>
                                    <h5>Quantity</h5>
                                    <div className='quantity'>
                                        <button onClick={() => {modifiedSubtractToCart(highestRated[0].name, highestRated[0].price, 0)}}>
                                            <RiSubtractFill />
                                        </button>
                                        <p>{highestRated[0].quantity}</p>
                                        <button onClick={() => {modifiedAddToCart(highestRated[0].name, highestRated[0].price, 0)}}>
                                            <RiAddFill />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='recommendedRightSide'>
                        <div className="recommendRightTop">
                            <div className="dishImage">
                            </div>
                            <div style={{margin: "4% 6% 4% 0"}}>
                                <h3>{highestRated[1].name}</h3>
                                <p style={{fontSize: "0.8em"}}>{highestRated[1].description}</p>
                                <div className="cardSeperationRight">
                                    <div>
                                        <h5>Rating</h5>
                                        <p>{highestRated[1].rating}</p>
                                    </div>
                                    <div>
                                        <h5>Price</h5>
                                        <p>${highestRated[1].price}</p>
                                    </div>
                                    <div>
                                        <h5>Quantity</h5>
                                        <div className='quantity'>
                                            <button onClick={() => {modifiedSubtractToCart(highestRated[1].name, highestRated[1].price, 1)}}>
                                                <RiSubtractFill />
                                            </button>
                                            <p>{highestRated[1].quantity}</p>
                                            <button onClick={() => {modifiedAddToCart(highestRated[1].name, highestRated[1].price, 1)}}>
                                                <RiAddFill />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="recommendRightBottom">
                            <div className="dishImage">
                            </div>
                            <div style={{margin: "4% 6% 4% 0"}}>
                                <h3>{highestRated[2].name}</h3>
                                <p style={{fontSize: "0.8em"}}>{highestRated[2].description}</p>
                                <div className="cardSeperationRight">
                                    <div>
                                        <h5>Rating</h5>
                                        <p>{highestRated[2].rating}</p>
                                    </div>
                                    <div>
                                        <h5>Price</h5>
                                        <p>${highestRated[2].price}</p>
                                    </div>
                                    <div>
                                        <h5>Quantity</h5>
                                        <div className='quantity'>
                                            <button onClick={() => {modifiedSubtractToCart(highestRated[2].name, highestRated[2].price, 2)}}>
                                                <RiSubtractFill />
                                            </button>
                                            <p>{highestRated[2].quantity}</p>
                                            <button onClick={() => {modifiedAddToCart(highestRated[2].name, highestRated[2].price, 2)}}>
                                                <RiAddFill />
                                            </button>
                                        </div>
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
                        <div className="dishImage">
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
                                        <button onClick={() => {addToCartSubtract(1)}}>
                                            <RiSubtractFill />
                                        </button>
                                        <p>1</p>
                                        <button onClick={() => {addToCartAdd(1)}}>
                                            <RiAddFill />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='recommendedRightSide'>
                        <div className="recommendRightTop">
                            <div className="dishImage">
                            </div>
                            <div style={{margin: "4% 6% 4% 0"}}>
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
                                    <div>
                                        <h5>Quantity</h5>
                                        <div className='quantity'>
                                            <button onClick={() => {addToCartSubtract(1)}}>
                                                <RiSubtractFill />
                                            </button>
                                            <p>1</p>
                                            <button onClick={() => {addToCartAdd(1)}}>
                                                <RiAddFill />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="recommendRightBottom">
                            <div className="dishImage">
                            </div>
                            <div style={{margin: "4% 6% 4% 0"}}>
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
                                    <div>
                                        <h5>Quantity</h5>
                                        <div className='quantity'>
                                            <button onClick={() => {addToCartSubtract(1)}}>
                                                <RiSubtractFill />
                                            </button>
                                            <p>1</p>
                                            <button onClick={() => {addToCartAdd(1)}}>
                                                <RiAddFill />
                                            </button>
                                        </div>
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
                                <div className="dishImage" style={{backgroundImage: getImage(item.image)}}>
                                    <p></p>
                                </div>
                                <div style  = {{margin: "6% 0"}}>
                                    <h3>{item.name}</h3>
                                    <p style={{fontSize: "0.9em", margin: "7% 0 10% 0"}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, suscipit voluptatum minima, debitis tempore labore ab cumque maiores culpa quisquam iste cum consectetur tempora recusandae maxime qui earum, ratione adipisci.</p>
                                    <div className="cardSeperation">
                                        <div>
                                            <h5>Rating</h5>
                                            <p>{item.rating}</p>
                                        </div>
                                        <div>
                                            <h5>Price</h5>
                                            <p>$ { item.price } </p>
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
  