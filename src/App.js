import "./App.css";

import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/Authcontext";

import SignUp from "./SignUpComps/signUp";
import SignIn from "./SignInComps/signIn";

import Footer from "./recycleComps/footer";

import Navbar from "./navComps/navbar";

import FinalPage from "./checkoutComps/finalPage";
import CheckoutCart from "./checkoutComps/checkoutCart";

import Reviews from "./reviewComps/reviews";

import UserProfile from "./userComps/userProfile";
import ChefProfile from "./chefComps/chefProfile";
import DeliveryProfile from "./deliveryComps/deliveryProfile";
import ManagerProfile from "./managerComps/managerProfile";
import Missing from "./404Page/missing";
import Unauthorized from "./userComps/unauthorized";

import MainSearch from "./searchComps/search";
import { FoodProvider } from "./contexts/foodContext";

import Discussion from "./discussionComps/discussion";
import OrderReview from "./orderReviewComps/orderReview";

import DeliveryReview from "./deliveryReviewComps/deliveryReview";

import FullReview from "./fullReviewComps/fullReview";
import ChefDishes from "./ChefDishesComps/chefDishes";

import SeeBids from "./seeBidsComps/seeBids";


const ROLES = {
  User: 11,
  Chef: 22,
  Delivery: 33,
  Manager: 1001,
};

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <FoodProvider>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<MainSearch />} />

            {/* Public Routes */}
            <Route exact path="/signUp" element={<SignUp />} />
            <Route exact path="/signIn" element={<SignIn />} />
            <Route exact path="/unauthorized" element={<Unauthorized />} />

            {/* Need to Protect these Routes */}
            {/* <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}> */}
            <Route exact path="/checkoutCart" element={<CheckoutCart />} />
            <Route exact path="/finalPage" element={<FinalPage />} />
            
            <Route exact path="/userProfile" element={<UserProfile />} />
             

            {/* <Route element={<RequireAuth allowedRoles={[ROLES.Chef]} />}> */}
            <Route exact path="/chefProfile" element={<ChefProfile />} />
            {/* </Route> */}

            {/* <Route element={<RequireAuth allowedRoles={[ROLES.Delivery]} />}> */}
            <Route
              exact
              path="/deliveryProfile"
              element={<DeliveryProfile />}
            />
            {/* </Reviwes> */}
            <Route
              path="/reviews/:id"
              element={<Reviews />}
            />

            <Route
              path="/orderReview/:id"
              element={<OrderReview />}
            />

            <Route
              path="/deliveryOrderReview/:id"
              element={<DeliveryReview />}
            />

            <Route
              path="/seeFullReview/:id"
              element={<FullReview />}
            />

            <Route 
              path="/allFoods/:id"
              element = {<ChefDishes />}
            />

            <Route
              path="/seeBids/:id"
              element = {<SeeBids />}
            />     

            {/* <Route element={<RequireAuth allowedRoles={[ROLES.Manager]} />}> */}
            <Route exact path="/managerProfile" element={<ManagerProfile />} />
            {/* </Route> */}

            {/* Catch all */}
            <Route exact path="*" element={<Missing />} />
          </Routes>
        </FoodProvider>
      </AuthProvider>

      <Footer></Footer>
    </div>
  );
}

export default App;
