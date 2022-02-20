
import './App.css';

import {
  Routes,
  Route,
} from "react-router-dom";

import { AuthProvider } from "./contexts/Authcontext"

import SignUp from './SignUpComps/signUp';
import SignIn from './SignInComps/signIn';

import Footer from './recycleComps/footer';
import FinalPage from './checkoutComps/finalPage';

function App() {
  return (
    <div className="App">
      <FinalPage />
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<SignUp />} />
          <Route exact path="/signIn" element={<SignIn />} />
        </Routes>
      </AuthProvider>
      <Footer></Footer>
    </div>
  );
}

export default App;
