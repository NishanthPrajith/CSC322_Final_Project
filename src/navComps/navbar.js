import './navbar.css';
import { BiSearch } from "react-icons/bi";

import { useFood } from '../contexts/foodContext';

export default function Navbar() {

    var { allFoodItems, changeFlilteredFoodItems  } = useFood();

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
        })
    }
    return (
        <nav>
            <div className='navBarLeftSide'>
                <div className='logo'>
                    <p>Norm's</p>
                    <p>PIZZA</p>
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
                    <button>Sign In</button>
                </div> }
                <div>
                    <div className='cartCount'>
                        <p>11</p>
                    </div>
                    <p style = {{fontWeight: "bold"}}>Cart</p>
                </div>
            </div>
        </nav>
    );
}