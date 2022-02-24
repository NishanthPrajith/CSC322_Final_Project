
import './App.css';

import {
  Routes,
  Route,
} from "react-router-dom";

import { AuthProvider } from "./contexts/Authcontext"

import SignUp from './SignUpComps/signUp';
import SignIn from './SignInComps/signIn';

import Footer from './recycleComps/footer';

import Navbar from './navComps/navbar';

import FinalPage from './checkoutComps/finalPage';
import CheckoutCart from './checkoutComps/checkoutCart';

import userProfile from './userComps/userProfile';

import MainSearch from './searchComps/search';
import { FoodProvider } from './contexts/foodContext';


function App() {
  return (
    <div className="App">
      
      <AuthProvider>
        <FoodProvider>
          <Navbar />
          <Routes>
            <Route exact path="/" element={
              <MainSearch />
            } />
            <Route exact path="/signUp" element={<SignUp />} />
            <Route exact path="/signIn" element={<SignIn />} />
            <Route exact path="/checkoutCart" element={<CheckoutCart />} />
            <Route exact path="/finalPage" element={<FinalPage />} />
            <Route exact path='/userProfile' element={<userProfile />} />
          </Routes>
        </FoodProvider>
      </AuthProvider>
    
      <Footer></Footer>
    </div>
  );
}

export default App;


