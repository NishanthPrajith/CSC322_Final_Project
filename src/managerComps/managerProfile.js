import './managerProfile.css'

import { useEffect, useState } from "react"
import { useAuth } from "../contexts/Authcontext";

export default function ManagerProfile() {

    const [choice, setChoice] = useState(0);
    const [orderChoice, setOrderChoice] = useState(0);

    const { getUsers, updateRole } = useAuth();

    function handleClick(i) {
        console.log(getUsers);
        setChoice(i);
    }
    
    return (
        <div className="managerProfile">
            <h1>Managers Page</h1>
            <div className="ChoicesLink">
                <div onClick = {() => {handleClick(0)}} style={choice == 0 ? {backgroundColor: "var(--yellow)"} : {}}>
                    Customer Approvals
                </div>
                <div onClick = {() => {handleClick(1)}} style={choice == 1 ? {backgroundColor: "var(--yellow)"} : {}}>
                    Complaints
                </div>
                <div onClick = {() => {handleClick(2)}} style={choice == 2 ? {backgroundColor: "var(--yellow)"} : {}}>
                    Delivery
                </div>
            </div>
            {choice === 0 && 
                <div>
                    { 
                    getUsers.map((item) => {
                        return (
                            <div className="userCard">
                                <div>
                                    <h3>{ item.name }</h3>
                                    <p>{ item.email }</p>
                                </div>
                                <div>
                                    <button onClick={() => {updateRole(item.id, 11)}}>
                                        Approve
                                    </button>
                                </div>
                            </div>
                        );
                    })
                    }
                </div>
            }
        </div>
    )
}