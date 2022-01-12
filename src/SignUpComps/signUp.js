
import './signUp.css'
import { Link } from 'react-router-dom';

import { useAuth } from "../contexts/Authcontext"

export default function SignUp() {

    const { signup } = useAuth();

    async function SignUp(event) {
        event.preventDefault();
        var x = document.getElementsByClassName("input");
        var a = x[0].value;
        var b = x[1].value;
        console.log("---Sign Up---");
        console.log("Username ", a);
        console.log("Password ", b);

        try {
            const useruiid = await signup(a, b);
            alert('registered');
        } catch {
            alert("error");
        }
    }

    return (
        <div className='SignIn'>
            <Link to = "/signIn">
                <p>Go to Sign In Page</p>
            </Link>
            <h1>Sign Up</h1>
            
            <form onSubmit={() => { return false;} }>
                <div className="container">   
                    <label>Username : </label>   
                    <input type="text" className = "input" placeholder="Enter Username" name="username" required />  
                    <label>Password : </label>   
                    <input type="password" className = "input" placeholder="Enter Password" name="password" required />  
                    <button onClick={SignUp}>Sign Up</button>   
                </div>   
            </form> 
        </div>
    );
}