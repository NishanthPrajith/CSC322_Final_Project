import { Link } from "react-router-dom";

import './missing.css';

const Missing = () => {
    return (
        <div className="ErrorPage">
            <div>
                <h1>Oops! 404 Page Not Found!</h1>
                <div className="GobackButton">
                    <div className="GobackButtonButton">
                        <Link to="/">Go back to homepage</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Missing;