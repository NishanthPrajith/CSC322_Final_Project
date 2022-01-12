
import './App.css';

import {
  Routes,
  Route,
} from "react-router-dom";

import { AuthProvider } from "./contexts/Authcontext"

import SignUp from './SignUpComps/signUp';
import SignIn from './SignInComps/signIn';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<SignUp />} />
          <Route exact path="/signIn" element={<SignIn />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
