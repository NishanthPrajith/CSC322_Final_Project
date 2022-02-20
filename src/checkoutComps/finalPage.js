import {FiCheckCircle} from "react-icons/fi";
import './finalPage.css';

export default function FinalPage() {
    return (
        <div className="finalPageParent">
            <div className = "finalPage">
                <FiCheckCircle className = "finalPageCheck" />
                <h1>Thank you. Your order has been placed!</h1>
            </div>
        </div>
    )
}