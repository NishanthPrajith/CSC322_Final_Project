
import './signIn.css'
import { Link } from 'react-router-dom';

export default function SignIn() {

    async function SignIn(event) {
        event.preventDefault();
        var x = document.getElementsByClassName("input");
        console.log("---Sign In---");
        console.log("Username ", x[0].value);
        console.log("Password ", x[1].value);
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