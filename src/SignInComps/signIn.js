import "./signIn.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/Authcontext";

import { useState } from "react";

export default function SignIn() {
  const { login } = useAuth();
  const [signInError, setSignInError] = useState("");

  const history = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  async function SignIn(event) {
    event.preventDefault();
    var x = document.getElementsByClassName("input");
    var email = x[0].value;
    var pass = x[1].value;

    if (email === "" || pass === "") {
      document.getElementsByClassName("error")[0].innerHTML =
        "Please fill out all fields";
    } else {
      try {
        console.log("---Sign In---");
        console.log("Email ", email);
        console.log("Password ", pass);
        var temp = await login(email, pass);
        if (temp != 1 && temp != undefined) {
          setSignInError(temp.message);
        } else {
          history(from, { replace: true });
        }
      } catch (error) {
        alert(error.message);
      }
    }
  }

  return (
    <div className="SignIn">
      {/*This Section is the Logo*/}
      <div className="logo signTop">
        <p style={{ fontSize: "0.7em" }}>Norm's</p>
        <p style={{ fontSize: "1em" }}>PIZZA</p>
      </div>

      {/*This Section is the SignUp Box*/}
      <div className={"signBox"}>
        <h1 className={"signHeader"}>Sign In</h1>
        <form
          onSubmit={() => {
            return false;
          }}
        >
          <div className={"labelSpacing"}>
            <label> Email : </label>
            <input
              type={"text"}
              className={"input"}
              placeholder="Enter Email"
              name="email"
              required
            />
          </div>
          <div className={"labelSpacing"}>
            <label> Password : </label>
            <input
              type={"password"}
              className={"input"}
              placeholder="Enter Password"
              name="password"
              required
            />
          </div>
          <div className={"labelSpacingButton"}>
            <button className={"btnSubmit"} onClick={SignIn}>
              Sign In
            </button>
          </div>
          <div
            className="error"
            style={{
              color: "var(--red)",
              textAlign: "center",
              marginTop: "2%",
            }}
          >
            {signInError}
          </div>
        </form>
      </div>

      {/*This Section is to switch to SignIn*/}
      <h2 className={"divider"}>
        <span className={"signMsg"}>New to Norm's Pizza? Sign Up instead!</span>
      </h2>
      <Link
        className={"linkSignUp"}
        role="button"
        to="/signUp"
        style={{ color: "var(--white)" }}
      >
        Sign Up Instead
      </Link>
    </div>
  );
}
