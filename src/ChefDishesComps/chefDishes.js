import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFood } from "../contexts/foodContext";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function ChefDishes() {

    const { id } = useParams();

    const { chefDishes, getChefFood } = useFood();
    
    useEffect(() => {
        const test = async() => {  
            await getChefFood(id); 
        }
        test();
        console.log(chefDishes);
    }, [])

    function getImage(imageName) {
        var a = "url('" + imageName + "')";
        return a;
    }

    function goBack(e) {
        e.preventDefault();
        window.history.back();
    }

    return (
        <div className="chefProfile">
            <button className="goBackReviews" onClick={(e) => goBack(e)}>Go Back</button>
            <div className='foodItemsUI' style={{marginTop: "2%"}}>
                {chefDishes.length === 0 && <h3>No Dishes yet</h3>}
                {
                    chefDishes.map((item, index) => {
                        // console.log(userName, item.chef)
                        if (id == item.chefId){
                        return (
                            <div className="recommendedLeftSideMain" key = {index}>
                                <div className="dishImage" style={{backgroundImage: getImage(item.image)}}>
                                    <p></p>
                                </div>
                                <div style  = {{margin: "6% 0"}}>
                                    <h3>{item.name}                                {   
                                        item.special &&
                                        <AiFillStar className='special'/>
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
                                        {/* <div>
                                            <h5>Chef</h5>
                                            <p>{ item.chef } </p>
                                        </div> */}
                                    </div>
                                    <div style={{width: "100%", marginTop: "3%", textAlign: "right"}}>
                                        <button style={{backgroundColor: "transparent", cursor: "pointer", outline: "none", border: "none", color: "#0087bd"}}>
                                            <Link to={"/reviews/" + item.dishId} style={{color: "#0087bd"}}> See Reviews</Link>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    })
                }
            </div>
        </div>
    )
}