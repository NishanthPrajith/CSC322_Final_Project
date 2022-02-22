import './navbar.css';
import { BiSearch } from "react-icons/bi";

import { useFood } from '../contexts/foodContext';

import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

    var { allFoodItems, changeState, changeFlilteredFoodItems } = useFood();

    var loginSwitch = false;

    function searchClick() {
        const searchInput = document.querySelector("[data-search]");
        searchInput.addEventListener('input', (e) => {
            const value = e.target.value;
            console.log(value);
            const temp = []
            if (value === "") {
                changeFlilteredFoodItems(allFoodItems);
            } else {
                allFoodItems.forEach((item) => {
                    var check = item.name.toLowerCase().includes(value.toLowerCase());
                    if (check) {
                        temp.push(item);
                    }
                });
                changeFlilteredFoodItems(temp);
            }
        });
    }

    return (
        <nav>
            <div className='navBarLeftSide'>
                <div className='logo'>
                    <Link to = "/">
                        <p>Norm's</p>
                        <p>PIZZA</p>
                    </Link>
                </div>
                <div className='searchBar'>
                    <label>
                        <BiSearch />
                        <input onClick = {searchClick} type="search" name="name" placeholder='Search Pizzas and more...' data-search/>
                    </label>
                </div>
            </div>
            <div className='navBarRightSide'>
                { loginSwitch && <div>
                    Nishanth Prajith Kumar
                </div> }
                {!loginSwitch && <div>
                    <Link to = "/signIn">
                        <button>Sign In</button>
                    </Link>
                </div> }
                <div>
                    <Link to = "/checkoutCart">
                        <div className='cartCount'>
                            <p>{ changeState }</p>
                        </div>
                    </Link>
                    <Link to = "/checkoutCart">
                        <p style = {{fontWeight: "bold"}}>Cart</p>
                    </Link>
                </div>
            </div>
        </nav>
    );
}