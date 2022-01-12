
import './signIn.css'
import { Link } from 'react-router-dom';

import { useAuth } from "../contexts/Authcontext"

export default function SignIn() {

    const { login } = useAuth();

    async function SignIn(event) {
        event.preventDefault();
        var x = document.getElementsByClassName("input");
        var a = x[0].value;
        var b = x[1].value;
        console.log("---Sign In---");
        console.log("Username ", a);
        console.log("Password ", b);

        try {
            const useruiid = await login(a, b);
            alert('Logged In');
        } catch {
            alert("error");
        }
    }

    return (
        <div className='SignIn'>
            <Link to = "/">
                <p>Go to Sign Up Page</p>
            </Link>

            <h1>Sign In</h1>
            
            <form>  
                <div className="container">   
                    <label>Username : </label>   
                    <input type="text" className = "input" placeholder="Enter Username" name="username" required />  
                    <label>Password : </label>   
                    <input type="password" className = "input" placeholder="Enter Password" name="password" required />  
                    <button onClick={SignIn}>Sign In</button>   
                </div>   
            </form> 
        </div>
    )
}