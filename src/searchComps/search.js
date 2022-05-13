import './search.css';


import { useAuth } from '../contexts/Authcontext';

import { useFood } from "../contexts/foodContext";
import { useEffect, useState } from 'react';

import { RiAddFill, RiSubtractFill } from "react-icons/ri";
import { AiFillStar } from "react-icons/ai";
import UserProfile from '../userComps/userProfile';
import { Link } from 'react-router-dom';


export default function MainSearch() {

    const { filteredFoodItems, changeRecommendedDishes, recommendedDishes, getRecommendedDishes, getDishes, popularDishes, changeAllFoodItems, changePopularDishes, changeHighestRated, highestRated } = useFood();
    const [loading, setLoading] = useState(true);

    const { userRole, userId, loggedIn } = useAuth();

    const [role, setRole] = useState(-1);

    const [info, setInfo] = useState([]);      

    if (userRole !== role) {
        console.log("role changed");
        console.log(role);
        setRole(userRole);
        getDishes();
    }

    if (loading) {
        if (filteredFoodItems.length > 0 && popularDishes.length > 0 && highestRated.length > 0) {
            setLoading(false);
            console.log("-------");
            console.log(filteredFoodItems);
            console.log(highestRated);
            console.log(popularDishes);
        }
        return <div className='Loading'>
        </div>
    }

    async function addToCartAdd(id, arr) {
        var temp = arr;
        if (id !== -1) {
            temp[id].quantity += 1;
        }
        changeAllFoodItems(temp, 1);
    }

    function addToCartSubtract(id, arr) {
        var temp = arr;
        if (id !== -1) {
            temp[id].quantity = temp[id].quantity === 0 ? 0 : temp[id].quantity - 1;
        }
        changeAllFoodItems(temp, 2);
    }

    function getImage(imageName) {
        var a = "url('" + imageName + "')";
        return a;
    }

    function modifiedAddToCart(name, price) {
        var temp = -1;
        for (let i = 0; i < filteredFoodItems.length; i++) {
            if (filteredFoodItems[i].name === name && filteredFoodItems[i].price === price) {
                temp = i;
                break;
            }
        }
        addToCartAdd(temp, filteredFoodItems);

        var a = highestRated;
        for (let i = 0; i < a.length; i++) {
            if (a[i].name === name && a[i].price === price) {
                a[i].quantity = a[i].quantity + 1;
            }
        }
        changeHighestRated(a);
        changeAllFoodItems(a, 1);
        
        var b = popularDishes;
        for (let i = 0; i < b.length; i++) {
            if (b[i].name === name && b[i].price === price) {
                b[i].quantity = b[i].quantity + 1;
            }
        }
        changePopularDishes(b);
        changeAllFoodItems(b, 1);

        var c = recommendedDishes;
        for (let i = 0; i < c.length; i++) {
            if (c[i].name === name && c[i].price === price) {
                c[i].quantity = c[i].quantity + 1;
            }
        }
        changeRecommendedDishes(c);
        changeAllFoodItems(c, 1);
    }

    function modifiedSubtractToCart(name, price) {
        var temp = -1;
        for (let i = 0; i < filteredFoodItems.length; i++) {
            if (filteredFoodItems[i].name === name && filteredFoodItems[i].price === price) {
                temp = i;
                break;
            }
        }
        addToCartSubtract(temp, filteredFoodItems);

        var a = highestRated;
        for (let i = 0; i < a.length; i++) {
            if (a[i].name === name && a[i].price === price) {
                a[i].quantity = a[i].quantity === 0 ? 0 : a[i].quantity - 1;
            }
        }
        changeHighestRated(a);
        changeAllFoodItems(a, 2);
        
        var b = popularDishes;
        for (let i = 0; i < b.length; i++) {
            if (b[i].name === name && b[i].price === price) {
                b[i].quantity = b[i].quantity === 0 ? 0 : b[i].quantity - 1;
            }
        }
        changePopularDishes(b);
        changeAllFoodItems(b, 2);

        var c = recommendedDishes;
        for (let i = 0; i < c.length; i++) {
            if (c[i].name === name && c[i].price === price) {
                c[i].quantity = c[i].quantity === 0 ? 0 : c[i].quantity - 1;
            }
        }
    }

    return (
        <div className='search'>
            {
                recommendedDishes.length === 3 && loggedIn &&
                <div>
                    <p className="searchHeading">Previous Orders</p>
                    <div className='recommendedUI'>
                        <div className="recommendedLeftSide">
                            <div className="dishImage" style={{backgroundImage: getImage(recommendedDishes[0].image)}}>
                            </div>
                            <div>
                                <h3>{recommendedDishes[0].name} 
                                {   
                                    recommendedDishes[0].special &&
                                    <AiFillStar className='special'/>
                                }</h3>
                                <p style={{fontSize: "0.9em"}}>{recommendedDishes[0].description}</p>
                                <div className="cardSeperation">
                                    <div>
                                        <h5>Rating</h5>
                                        <p>{recommendedDishes[0].rating}</p>
                                    </div>
                                    <div>
                                        <h5>Price</h5>
                                        <p>${recommendedDishes[0].price}</p>
                                    </div>
                                    <div>
                                        <h5>Quantity</h5>
                                        <div className='quantity'>
                                            <button onClick={() => {modifiedSubtractToCart(recommendedDishes[0].name, recommendedDishes[0].price)}}>
                                                <RiSubtractFill />                                        
                                            </button>
                                            <p>{recommendedDishes[0].quantity}</p>
                                            <button onClick={() => {modifiedAddToCart(recommendedDishes[0].name, recommendedDishes[0].price)}}>
                                                <RiAddFill />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div style={{width: "100%", marginTop: "3%", textAlign: "right"}}>
                                    <button style={{backgroundColor: "transparent", cursor: "pointer", outline: "none", border: "none", color: "#0087bd"}}>
                                        <Link to={"/reviews/" + recommendedDishes[0].dishId} style={{color: "#0087bd"}}> See Reviews</Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='recommendedRightSide'>
                            <div className="recommendRightTop">
                                <div className="dishImage" style={{backgroundImage: getImage(recommendedDishes[1].image)}}>
                                </div>
                                <div style={{margin: "4% 6% 4% 0"}}>
                                    <h3>{recommendedDishes[1].name}
                                    {   
                                        recommendedDishes[1].special &&
                                        <AiFillStar className='special'/>
                                    }</h3>
                                    <p style={{fontSize: "0.8em"}}>{recommendedDishes[1].description}</p>
                                    <div className="cardSeperationRight">
                                        <div>
                                            <h5>Rating</h5>
                                            <p>{recommendedDishes[1].rating}</p>
                                        </div>
                                        <div>
                                            <h5>Price</h5>
                                            <p>${recommendedDishes[1].price}</p>
                                        </div>
                                        <div>
                                            <h5>Quantity</h5>
                                            <div className='quantity'>
                                                <button onClick={() => {modifiedSubtractToCart(recommendedDishes[1].name, recommendedDishes[1].price)}}>
                                                    <RiSubtractFill />
                                                </button>
                                                <p>{recommendedDishes[1].quantity}</p>
                                                <button onClick={() => {modifiedAddToCart(recommendedDishes[1].name, recommendedDishes[1].price)}}>
                                                    <RiAddFill />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{width: "100%", marginTop: "3%", textAlign: "right"}}>
                                        <button style={{backgroundColor: "transparent", cursor: "pointer", outline: "none", border: "none", color: "#0087bd"}}>
                                            <Link to={"/reviews/" + recommendedDishes[1].dishId} style={{color: "#0087bd"}}> See Reviews</Link>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="recommendRightBottom">
                                <div className="dishImage" style={{backgroundImage: getImage(recommendedDishes[2].image)}}>
                                </div>
                                <div style={{margin: "4% 6% 4% 0"}}>
                                    <h3>{recommendedDishes[2].name}
                                    {   
                                        recommendedDishes[2].special &&
                                        <AiFillStar className='special'/>
                                    }</h3>
                                    <p style={{fontSize: "0.8em"}}>{recommendedDishes[2].description}</p>
                                    <div className="cardSeperationRight">
                                        <div>
                                            <h5>Rating</h5>
                                            <p>{recommendedDishes[2].rating}</p>
                                        </div>
                                        <div>
                                            <h5>Price</h5>
                                            <p>${recommendedDishes[2].price}</p>
                                        </div>
                                        <div>
                                            <h5>Quantity</h5>
                                            <div className='quantity'>
                                                <button onClick={() => {modifiedSubtractToCart(recommendedDishes[2].name, recommendedDishes[2].price)}}>
                                                    <RiSubtractFill />
                                                </button>
                                                <p>{recommendedDishes[2].quantity}</p>
                                                <button onClick={() => {modifiedAddToCart(recommendedDishes[2].name, recommendedDishes[2].price)}}>
                                                    <RiAddFill />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{width: "100%", marginTop: "3%", textAlign: "right"}}>
                                        <button style={{backgroundColor: "transparent", cursor: "pointer", outline: "none", border: "none", color: "#0087bd"}}>
                                            <Link to={"/reviews/" + recommendedDishes[2].dishId} style={{color: "#0087bd"}}> See Reviews</Link>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div>
                <p className="searchHeading">Highest Rated Dishes</p>
                <div className='recommendedUI'>
                    <div className="recommendedLeftSide">
                        <div className="dishImage" style={{backgroundImage: getImage(highestRated[0].image)}}>
                        </div>
                        <div>
                            <h3>{highestRated[0].name} 
                            {   
                                highestRated[0].special &&
                                <AiFillStar className='special'/>
                            }</h3>
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
                                        <button onClick={() => {modifiedSubtractToCart(highestRated[0].name, highestRated[0].price)}}>
                                            <RiSubtractFill />                                        </button>
                                        <p>{highestRated[0].quantity}</p>
                                        <button onClick={() => {modifiedAddToCart(highestRated[0].name, highestRated[0].price)}}>
                                            <RiAddFill />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div style={{width: "100%", marginTop: "3%", textAlign: "right"}}>
                                <button style={{backgroundColor: "transparent", cursor: "pointer", outline: "none", border: "none", color: "#0087bd"}}>
                                    <Link to={"/reviews/" + highestRated[0].dishId} style={{color: "#0087bd"}}> See Reviews</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='recommendedRightSide'>
                        <div className="recommendRightTop">
                            <div className="dishImage" style={{backgroundImage: getImage(highestRated[1].image)}}>
                            </div>
                            <div style={{margin: "4% 6% 4% 0"}}>
                                <h3>{highestRated[1].name}
                                {   
                                    highestRated[1].special &&
                                    <AiFillStar className='special'/>
                                }</h3>
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
                                            <button onClick={() => {modifiedSubtractToCart(highestRated[1].name, highestRated[1].price)}}>
                                                <RiSubtractFill />
                                            </button>
                                            <p>{highestRated[1].quantity}</p>
                                            <button onClick={() => {modifiedAddToCart(highestRated[1].name, highestRated[1].price)}}>
                                                <RiAddFill />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div style={{width: "100%", marginTop: "3%", textAlign: "right"}}>
                                    <button style={{backgroundColor: "transparent", cursor: "pointer", outline: "none", border: "none", color: "#0087bd"}}>
                                        <Link to={"/reviews/" + highestRated[1].dishId} style={{color: "#0087bd"}}> See Reviews</Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="recommendRightBottom">
                            <div className="dishImage" style={{backgroundImage: getImage(highestRated[2].image)}}>
                            </div>
                            <div style={{margin: "4% 6% 4% 0"}}>
                                <h3>{highestRated[2].name}
                                {   
                                    highestRated[2].special &&
                                    <AiFillStar className='special'/>
                                }</h3>
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
                                            <button onClick={() => {modifiedSubtractToCart(highestRated[2].name, highestRated[2].price)}}>
                                                <RiSubtractFill />
                                            </button>
                                            <p>{highestRated[2].quantity}</p>
                                            <button onClick={() => {modifiedAddToCart(highestRated[2].name, highestRated[2].price)}}>
                                                <RiAddFill />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div style={{width: "100%", marginTop: "3%", textAlign: "right"}}>
                                    <button style={{backgroundColor: "transparent", cursor: "pointer", outline: "none", border: "none", color: "#0087bd"}}>
                                        <Link to={"/reviews/" + highestRated[2].dishId} style={{color: "#0087bd"}}> See Reviews</Link>
                                    </button>
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
                        <div className="dishImage" style={{backgroundImage: getImage(popularDishes[0].image)}}>
                        </div>
                        <div>
                            <h3>{popularDishes[0].name}
                            {   
                                popularDishes[0].special &&
                                <AiFillStar className='special'/>
                            }</h3>
                            <p style={{fontSize: "0.9em"}}>{popularDishes[0].description}</p>
                            <div className="cardSeperation">
                                <div>
                                    <h5>Rating</h5>
                                    <p>{popularDishes[0].rating}</p>
                                </div>
                                <div>
                                    <h5>Price</h5>
                                    <p>${popularDishes[0].price}</p>
                                </div>
                                <div>
                                    <h5>Quantity</h5>
                                    <div className='quantity'>
                                        <button onClick={() => {modifiedSubtractToCart(popularDishes[0].name, popularDishes[0].price)}}>
                                            <RiSubtractFill />
                                        </button>
                                        <p>{popularDishes[0].quantity}</p>
                                        <button onClick={() => {modifiedAddToCart(popularDishes[0].name, popularDishes[0].price)}}>
                                            <RiAddFill />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div style={{width: "100%", marginTop: "3%", textAlign: "right"}}>
                                <button style={{backgroundColor: "transparent", cursor: "pointer", outline: "none", border: "none", color: "#0087bd"}}>
                                    <Link to={"/reviews/" + popularDishes[0].dishId} style={{color: "#0087bd"}}> See Reviews</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='recommendedRightSide'>
                        <div className="recommendRightTop">
                            <div className="dishImage" style={{backgroundImage: getImage(popularDishes[1].image)}}>
                            </div>
                            <div style={{margin: "4% 6% 4% 0"}}>
                                <h3>{popularDishes[1].name}
                                {   
                                    popularDishes[1].special &&
                                    <AiFillStar className='special'/>
                                }</h3>
                                <p style={{fontSize: "0.8em"}}>{popularDishes[1].description}</p>
                                <div className="cardSeperationRight">
                                    <div>
                                        <h5>Rating</h5>
                                        <p>{popularDishes[1].rating}</p>
                                    </div>
                                    <div>
                                        <h5>Price</h5>
                                        <p>${popularDishes[1].price}</p>
                                    </div>
                                    <div>
                                        <h5>Quantity</h5>
                                        <div className='quantity'>
                                            <button onClick={() => {modifiedSubtractToCart(popularDishes[1].name, popularDishes[1].price)}}>
                                                <RiSubtractFill />
                                            </button>
                                            <p>{popularDishes[1].quantity}</p>
                                            <button onClick={() => {modifiedAddToCart(popularDishes[1].name, popularDishes[1].price)}}>
                                                <RiAddFill />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div style={{width: "100%", marginTop: "3%", textAlign: "right"}}>
                                    <button style={{backgroundColor: "transparent", cursor: "pointer", outline: "none", border: "none", color: "#0087bd"}}>
                                        <Link to={"/reviews/" + popularDishes[1].dishId} style={{color: "#0087bd"}}> See Reviews</Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="recommendRightBottom">
                            <div className="dishImage" style={{backgroundImage: getImage(popularDishes[2].image)}}>
                            </div>
                            <div style={{margin: "4% 6% 4% 0"}}>
                                <h3>{popularDishes[2].name}
                                {   
                                    popularDishes[2].special &&
                                    <AiFillStar className='special'/>
                                }</h3>
                                <p style={{fontSize: "0.8em"}}>{popularDishes[2].description}</p>
                                <div className="cardSeperationRight">
                                    <div>
                                        <h5>Rating</h5>
                                        <p>{popularDishes[2].rating}</p>
                                    </div>
                                    <div>
                                        <h5>Price</h5>
                                        <p>${popularDishes[2].price}</p>
                                    </div>
                                    <div>
                                        <h5>Quantity</h5>
                                        <div className='quantity'>
                                            <button onClick={() => {modifiedSubtractToCart(popularDishes[2].name, popularDishes[2].price)}}>
                                                <RiSubtractFill />
                                            </button>
                                            <p>{popularDishes[2].quantity}</p>
                                            <button onClick={() => {modifiedAddToCart(popularDishes[2].name, popularDishes[2].price)}}>
                                                <RiAddFill />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div style={{width: "100%", marginTop: "3%", textAlign: "right"}}>
                                    <button style={{backgroundColor: "transparent", cursor: "pointer", outline: "none", border: "none", color: "#0087bd"}}>
                                        <Link to={"/reviews/" + popularDishes[2].dishId} style={{color: "#0087bd"}}> See Reviews</Link>
                                    </button>
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
                                    <h3>{item.name}
                                    {
                                        item.special &&
                                        <AiFillStar className = "special" />
                                    }</h3>
                                    <p style={{fontSize: "0.9em", margin: "7% 0 10% 0"}}>{item.description}</p>
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
                                                <button onClick={() => {modifiedSubtractToCart(item.name, item.price)}}>
                                                    <RiSubtractFill />
                                                </button>
                                                <p>{item.quantity}</p>
                                                <button onClick={() => {modifiedAddToCart(item.name, item.price)}}>
                                                    <RiAddFill />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{width: "100%", marginTop: "3%", textAlign: "right"}}>
                                        <button style={{backgroundColor: "transparent", cursor: "pointer", outline: "none", border: "none", color: "#0087bd"}}>
                                            <Link to={"/reviews/" + item.dishId} style={{color: "#0087bd"}}> See Reviews</Link>
                                        </button>
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
  