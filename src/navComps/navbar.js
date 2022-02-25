import "./navbar.css";
import { BiSearch } from "react-icons/bi";

import { useFood } from "../contexts/foodContext";

import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/Authcontext";

export default function Navbar() {
  var { allFoodItems, changeState, changeFlilteredFoodItems } = useFood();

  const { loggedIn, userName, handleLogout } = useAuth();

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
            <Link to="/userProfile">
              <div class="dropdown">
                <button class="dropbtn">
                  Hello,<p className="username"> {userName} </p>
                </button>
                <div class="dropdown-content">
                  <Link to="/userProfile">User Profile</Link>
                  <Link to="/vipProfile">Vip Profile</Link>
                  <Link to="/chefProfile">Chef Profile</Link>
                  <Link to="/deliveryProfile">Delivery Profile</Link>
                  <Link to="/managerProfile">Manager Profile</Link>

                  <Link to="/" onClick={handleLogout}>
                    Sign Out
                  </Link>
                </div>
              </div>
            </Link>
          </div>
        )}
        {!loggedIn && (
          <div>
            <Link to="/signIn">
              {/* <button>Sign In</button> */}
              <div className="header__option">
                <span className="header__optionLineOne">Hello, Guest</span>
                <span className="header__optionLineTwo">Sign In</span>
              </div>
            </Link>
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
