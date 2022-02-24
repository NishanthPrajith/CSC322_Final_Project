
import './signUp.css'
import { Link } from 'react-router-dom';

import { useAuth } from "../contexts/Authcontext"

export default function SignUp() {

    const { signup } = useAuth();

    async function SignUp(event) {
        event.preventDefault();
        var x = document.getElementsByClassName("input");
        var name = x[0].value;
        var email = x[1].value;
        var pass = x[2].value;

        if (name === "" || email === "" || pass === "") {
            document.getElementsByClassName("error")[0].innerHTML = "Please fill out all fields";
        } else {
            try {
                console.log("---Sign Up---");
                console.log("Email ", email);
                console.log("Password ", pass);
                await signup(name, email, pass);
            } catch {
                alert("error");
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
                    <div className={"labelSpacingButton"}>
                        <button className={"btnSubmit"} onClick={SignUp}>Sign Up</button>
                    </div>
                    <div className='error' style = {{color: "var(--red)", textAlign: "center", marginTop: "2%"}}></div>
                </form>
            </div>

            {/*This Section is to switch to SignIn*/}
            <h2 className={"divider"}><span className={"signMsg"}>Already have an account?</span></h2>
            <Link className={"linkSignUp"} role="button" to="/signIn" style={{color: "var(--white)"}}>Sign In Instead</Link>
        </div>
    );
}