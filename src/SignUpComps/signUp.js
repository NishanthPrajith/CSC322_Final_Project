
import './signUp.css'
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from "../contexts/Authcontext"
import { useState } from 'react';

export default function SignUp() {
    const history = useNavigate();

    const { signup, loggedIn } = useAuth();
    
    const [error, setError] = useState("");

    async function SignUp(event) {
        event.preventDefault();
        var x = document.getElementsByClassName("input");
        var name = x[0].value;
        var email = x[1].value;
        var pass = x[2].value;
        var role = x[3].value;

        if (name === "" || email === "" || pass === "") {
            document.getElementsByClassName("error")[0].innerHTML = "Please fill out all fields";
        } else {
            try {
                console.log("---Sign Up---");
                console.log("Name ", name);
                console.log("Email ", email);
                console.log("Password ", pass);
                var temp = await signup(name, email, pass, role);
                if (temp != 1) {
                    console.log("temp: ", temp);
                    setError(temp.message);
                } else {
                    alert("Sign Up Successful");
                    history("/signIn");
                }
            } catch (error) {
                alert(error.message);
            }
        }
    }

    return (
        <div className='SignIn'>
            {/*This Section is the Logo*/}
            <div className='logo signTop'>
                <p style={{fontSize: "0.7em"}}>Norm's</p>
                <p style={{fontSize: "1em"}}>PIZZA</p>
            </div>

            {/*This Section is the SignUp Box*/}
            <div className={"signBox"}>
                <h1 className={"signHeader"}>Sign Up</h1>
                <form onSubmit={() => { return false;} }>
                    <div className={"labelSpacing"}>
                        <label> Name : </label>
                        <input type={"text"} className={"input"} placeholder="Enter Name" name="name" required />
                    </div>
                    <div className={"labelSpacing"}>
                        <label> Email : </label>
                        <input type={"text"} className={"input"} placeholder="Enter Email" name="email" required />
                    </div>
                    <div className={"labelSpacing"}>
                        <label > Password : </label>
                        <input type={"password"} className={"input"} placeholder="Enter Password" name="password" required />
                    </div>
                    <div className={"labelSpacing"}>
                        <label> Type of Account : </label>
                        <select className={"input"} required >
                            <option>Customer</option>
                            <option>Delivery Person</option>
                            <option>Chef</option>
                        </select>
                    </div>
                    <div className={"labelSpacingButton"}>
                        <button className={"btnSubmit"} onClick={SignUp}>Sign Up</button>
                    </div>
                    <div className='error' style = {{color: "var(--red)", textAlign: "center", marginTop: "2%"}}>{error}</div>
                </form>
            </div>
            {/*This Section is to switch to SignIn*/}
            <h2 className={"divider"}><span className={"signMsg"}>Already have an account?</span></h2>
            <Link className={"linkSignUp"} role="button" to="/signIn" style={{color: "var(--white)"}}>Sign In Instead</Link>
        </div>
    );
}