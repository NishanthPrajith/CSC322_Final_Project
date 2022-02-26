import './userProfile.css';
import './previousOrders';
import PreviousOrders from './previousOrders';

export default function UserProfile() {
    return (
        <div>
            <h1 className = "userProfileTitle">User Profile</h1>
            <PreviousOrders/>
        </div>
    )
}