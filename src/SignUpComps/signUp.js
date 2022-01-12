
import './signUp.css'
import { Link } from 'react-router-dom';

export default function SignUp() {


    async function SignUp(event) {
        event.preventDefault();
        var x = document.getElementsByClassName("input");
        console.log("---Sign Up---");
        console.log("Username ", x[0].value);
        console.log("Password ", x[1].value);
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