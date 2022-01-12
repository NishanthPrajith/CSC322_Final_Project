
import './App.css';

import {
  Routes,
  Route,
} from "react-router-dom";

import SignUp from './SignUpComps/signUp';
import SignIn from './SignInComps/signIn';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<SignUp />} />
        <Route exact path="/signIn" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
