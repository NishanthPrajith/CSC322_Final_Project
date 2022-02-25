import "./App.css";

import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/Authcontext";

import SignUp from "./SignUpComps/signUp";
import SignIn from "./SignInComps/signIn";

import Footer from "./recycleComps/footer";

import Navbar from "./navComps/navbar";

import FinalPage from "./checkoutComps/finalPage";
import CheckoutCart from "./checkoutComps/checkoutCart";

import UserProfile from "./userComps/userProfile";
import ChefProfile from "./userComps/chefProfile";
import DeliveryProfile from "./userComps/deliveryProfile";
import ManagerProfile from "./userComps/managerProfile";
import VipProfile from "./userComps/vipProfile";
import Guest from "./userComps/guest";
import Missing from "./userComps/missing";
import Unauthorized from "./userComps/unauthorized";

import RequireAuth from "./userComps/requireAuth";

import MainSearch from "./searchComps/search";
import { FoodProvider } from "./contexts/foodContext";

const ROLES = {
  User: 11,
  Vip: 111,
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
            <Route exact path="/guest" element={<Guest />} />
            <Route exact path="/unauthorized" element={<Unauthorized />} />

            {/* Need to Protect these Routes */}
            {/* <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}> */}
            <Route exact path="/checkoutCart" element={<CheckoutCart />} />
            <Route exact path="/finalPage" element={<FinalPage />} />
            <Route exact path="/userProfile" element={<UserProfile />} />
            {/* </Route> */}

            {/* <Route element={<RequireAuth allowedRoles={[ROLES.Vip]} />}> */}
            <Route exact path="/vipProfile" element={<VipProfile />} />
            {/* </Route> */}

            {/* <Route element={<RequireAuth allowedRoles={[ROLES.Chef]} />}> */}
            <Route exact path="/chefProfile" element={<ChefProfile />} />
            {/* </Route> */}

            {/* <Route element={<RequireAuth allowedRoles={[ROLES.Delivery]} />}> */}
            <Route
              exact
              path="/deliveryProfile"
              element={<DeliveryProfile />}
            />
            {/* </Route> */}

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
