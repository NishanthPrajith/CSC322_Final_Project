
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

import MainSearch from './searchComps/search';
import { FoodProvider } from './contexts/foodContext';
import { useState } from 'react';

function App() {

  const [change, changeStateDone] = useState(false);

  return (
    <div className="App">
      <FoodProvider>
        <Navbar changeState = {changeStateDone}/>
        <MainSearch changeState = {changeStateDone}/>  
      </FoodProvider>
      {/* <AuthProvider>
        <Routes>
          <Route exact path="/" element={<SignUp />} />
          <Route exact path="/signIn" element={<SignIn />} />
        </Routes>
      </AuthProvider> */}
    
      <Footer></Footer>
    </div>
  );
}

export default App;


