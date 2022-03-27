import "./navbar.css";
import { BiSearch } from "react-icons/bi";

import { useFood } from "../contexts/foodContext";

import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/Authcontext";

export default function Navbar() {
  var { allFoodItems, changeState, changeFlilteredFoodItems } = useFood();

  const { loggedIn, userName, handleLogout, userRole } = useAuth();

  function searchClick() {
    const searchInput = document.querySelector("[data-search]");
    searchInput.addEventListener("input", (e) => {
      const value = e.target.value;
      console.log(value);
      const temp = [];
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
      <div className="navBarLeftSide">
        <div className="logo">
          <Link to="/">
            <p>Norm's</p>
            <p>PIZZA</p>
          </Link>
        </div>
        <div className="searchBar">
          <label>
            <BiSearch />
            <input
              onClick={searchClick}
              type="search"
              name="name"
              placeholder="Search Pizzas and more..."
              data-search
            />
          </label>
        </div>
      </div>
      <div className="navBarRightSide">
        {loggedIn && (
          <div>
            {/* {userName} */}
            <div class="dropdown">
              <div class="dropbtn">
                Hello,  <p className="username"> {userName} </p>
              </div>
              <div class="dropdown-content">
                {(userRole == 11 || userRole == 111) && 
                  <Link to="/userProfile">User Profile</Link> }
                {userRole === 22 &&
                  <Link to="/chefProfile">Chef Profile</Link> }
                {userRole === 33 &&
                  <Link to="/deliveryProfile">Delivery Profile</Link> }
                {userRole == 1001 &&
                  <Link to="/managerProfile">Manager Profile</Link> }
                <Link to="/" onClick={handleLogout}>
                  Sign Out
                </Link>
              </div>
            </div>
          </div>
        )}
        {!loggedIn && (
          <div style = {{width: "100%"}}>
              {/* <button>Sign In</button> */}
              <div className="header__option">
                <span className="header__optionLineOne">Hello, Guest</span>
                <Link to="/signIn">
                  <span className="header__optionLineTwo">Sign In</span>
                </Link>
              </div>
          </div>
        )}
        <div>
          <Link to="/checkoutCart">
            <div className="cartCount">
              <p>{changeState}</p>
            </div>
          </Link>
          <Link to="/checkoutCart">
            <p style={{ fontWeight: "bold" }}>Cart</p>
          </Link>
        </div>
      </div>
    </nav>
  );
}
