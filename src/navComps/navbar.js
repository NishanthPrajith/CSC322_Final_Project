import './navbar.css';

export default function Navbar() {

    var loginSwitch = false;

    return (
        <nav>
            <div className='navBarLeftSide'>
                <div className='logo'>
                    <p>Norm's</p>
                    <p>PIZZA</p>
                </div>
                <div className='searchBar'>
                    searchBar
                </div>
            </div>
            <div className='navBarRightSide'>
                { loginSwitch && <div>
                    Nishanth Prajith Kumar                   
                </div> }
                {!loginSwitch && <div>
                    <button>Sign In</button>                    
                </div> }
                <div>
                    <div className='cartCount'>
                        <p>11</p>
                    </div>
                    <p style = {{fontWeight: "bold"}}>Cart</p>
                </div>
            </div>
        </nav>
    );
}