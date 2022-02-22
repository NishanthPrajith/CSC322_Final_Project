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
            const useruid = await login(a, b);
            alert('Logged In');
        } catch {
            alert("error");
        }
    }

    return (
        <div className='SignIn'>
            {/*This Section is the Logo*/}
            <div className='logo signTop'>
                    <Link to = "/">
                        <p>Norm's</p>
                        <p>PIZZA</p>
                    </Link>
                </div>

            {/*This Section is the SignUp Box*/}
            <div className={"signBox"}>
                <h1 className={"signHeader"}>Sign In</h1>
                <form onSubmit={() => { return false;} }>
                    <div className={"labelSpacing"}>
                        <label> Username : </label>
                        <input type={"text"} className={"input"} placeholder="Enter Username" name="username" required />
                    </div>
                    <div className={"labelSpacing"}>
                        <label > Password : </label>
                        <input type={"password"} className={"input"} placeholder="Enter Password" name="password" required />
                    </div>
                    <div className={"labelSpacing"}>
                        <button className={"btnSubmit"} onClick={SignIn()}>Sign In</button>
                    </div>
                </form>
            </div>

            {/*This Section is to switch to SignIn*/}
            <h2 className={"divider"}><span className={"signMsg"}>New to Norm's Pizza? Sign Up instead!</span></h2>
            <Link className={"linkSignUp"} role="button" to="/signUp"> Sign Up Instead</Link>

        </div>
    )
}