import './managerProfile.css'

import { useEffect, useState, useRef } from "react"
import { useAuth } from "../contexts/Authcontext";

import { Link } from 'react-router-dom';

import { useFood } from '../contexts/foodContext';

export default function ManagerProfile() {

    const [choice, setChoice] = useState(0);
    const [orderChoice, setOrderChoice] = useState(0);
    const [usersOrderNames, setUsersOrderNames] = useState([]);
    const [j, setJ] = useState(0);

    const [subchoice, setSubchoice] = useState(0);

    const { getUsers, getQuitUsers, getBannedUsers, getComplaints, deleteAccount, updateRole, deliveryOrders, getUsersName } = useAuth();

    const {deliveryPeople, chefPeople, chefJobsApplications, deliveryJobsApplications} = useFood();

    let orderNumber = 1;

    var deliveryName = {
        "qO2pUOremGaTHm4LGHnh9lP30C82": "Delivery One",
        "pF7O1rG6FIZre0Xpo4M5LQzUV7C2": "Delivery Two",
    }

    function handleClick(i) {
        console.log(getUsers);
        setChoice(i);
    }

    function handleJ(i) {
        setJ(i);
    }

    function handleSubClick(i) {
        setSubchoice(i);
    }
    
    useEffect(() => {
        console.log("-----------------");
        console.log(getQuitUsers);
        console.log(deliveryOrders);
        for (var i = 0; i < getComplaints.length; i++) {
            const getAPI = async() => {
                var s = await getUsersName(getComplaints[i].userId);
                var data = usersOrderNames;
                data.push(s);
                setUsersOrderNames(data);
            };
            getAPI();
        }
    }, []);
    
    return (
        <div className="managerProfile">
            <h1 style={{marginBottom: "5%"}}>Managers Page</h1>
            <div className="ChoicesLink">
                <div onClick = {() => {handleClick(0)}} style={choice == 0 ? {backgroundColor: "var(--yellow)"} : {}}>
                    Customer Approvals
                </div>
                <div onClick = {() => {handleClick(1)}} style={choice == 1 ? {backgroundColor: "var(--yellow)"} : {}}>
                    Complaints
                </div>
                <div onClick = {() => {handleClick(2)}} style={choice == 2 ? {backgroundColor: "var(--yellow)"} : {}}>
                    Delivery Bids
                </div>
                <div onClick = {() => {handleClick(3)}} style={choice == 3 ? {backgroundColor: "var(--yellow)"} : {}}>
                    Kickedout Customers
                </div>
                <div onClick = {() => {handleClick(4)}} style={choice == 4 ? {backgroundColor: "var(--yellow)"} : {}}>
                    Account Deletion
                </div>
                <div onClick = {() => {handleClick(5)}} style={choice == 5 ? {backgroundColor: "var(--yellow)"} : {}}>
                    Employees
                </div>
                <div onClick = {() => {handleClick(6)}} style={choice == 6 ? {backgroundColor: "var(--yellow)"} : {}}>
                    Job Applications
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
            {
                choice === 1 &&
                <div style={{marginTop: "5%"}}>
                    {
                        getComplaints.map((item, index) => {
                            return (
                                <div className='userCard'>
                                    <div>
                                        <h3>Order #{ index + 1 }</h3>
                                        {
                                            item.order.map((v, i) => {
                                                return (
                                                    <p>{ v.name } x {v.count}</p>
                                                );
                                            })
                                        }
                                        <h4>User : {usersOrderNames[index]} </h4>
                                        <h4>Delivery Name : {deliveryName[item.deliveryUserId]}</h4>
                                    </div>
                                    <div>
                                        {item.caseClosed ?
                                        <button style={{backgroundColor: "lightgreen", width: "100%"}}>
                                            Review Handled
                                        </button> :
                                        <button>
                                            <Link to={"/seeFullReview/" + index}>
                                                Review
                                            </Link>
                                        </button>
                                        }
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            }
            {choice === 2 &&
                <div style={{marginTop: "5%"}}>
                    {
                    deliveryOrders.map((item, index) => {
                        if (item.deliveryUserId === "" || item.deliveryUserId === undefined) {
                            orderNumber = orderNumber + 1;
                            return (
                                <div className="deliveryCardTwo">
                                    <div className={"deliveryLabel"}>
                                        <div>
                                            <h2>Order #{ orderNumber - 1 }</h2>
                                            <h4>Total Order Price : <span style={{fontSize: "1.5em"}}>${item.totalPrice}</span></h4>
                                        </div>
                                    </div>
                                    <div style={{display: "flex", justifyContent: "flex-end"}}>
                                        <h5 className={"labelOrderDate"}>{item.orderDate}</h5>
                                    </div>
                                                                            
                                    <Link to={"/seeBids/" + item.orderId} style = {{width: "200%", paddingBottom: "5%", color: "var(--yellow)", textAlign: "right"}}>
                                        See all the bids
                                    </Link>
                                </div>
                            );
                        }
                    })
                    }
                </div>
            }
            {choice === 3 &&
                <div>
                    { 
                    getBannedUsers.map((item) => {
                        return (
                            <div className="userCard">
                                <div>
                                    <h3>{ item.name }</h3>
                                    <h4>Warnings : { item.warnings }</h4>
                                    <p>{ item.email }</p>
                                </div>
                                <div>
                                    <button onClick={() => {
                                        alert("The account has been forgiven and all warnings have been cleared!");
                                        alert("$" + item.wallet + " in the wallet has been credited backed to the user");
                                        updateRole(item.id, 11)
                                    }}>
                                        Forgive
                                    </button>
                                    <br/>
                                    <button onClick={() => {
                                        alert("The account has been blacklisted!");
                                        alert("$" + item.wallet + " in the wallet has been credited backed to the user");
                                        updateRole(item.id, 333);
                                    }}>
                                        Ban & Blacklist
                                    </button>
                                </div>
                            </div>
                        );
                    })
                    }
                </div>
            }
            {choice === 4 &&
                <div>
                    { 
                    getQuitUsers.map((item) => {
                        return (
                            <div className="userCard">
                                <div>
                                    <h3>{ item.name }</h3>
                                    <p>{ item.email }</p>
                                </div>
                                <div>
                                    <button onClick={() => {
                                        alert("The account has been deleted!");
                                        alert("$" + item.wallet + " in the wallet has been credited backed to the user");
                                        deleteAccount(item.id);
                                    }}>
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        );
                    })
                    }
                </div>
            }
            {
                choice === 5 &&
                <div>
                    <div className="ChoicesLink" style={{marginTop: "6%", marginBottom: "4%", justifyContent : "flex-start"}}>
                        <div onClick = {() => {handleSubClick(0)}} style={subchoice == 0 ? {backgroundColor: "var(--yellow)"} : {}}>
                            Delivery People
                        </div>
                        <div onClick = {() => {handleSubClick(1)}} style={subchoice == 1 ? {backgroundColor: "var(--yellow)"} : {}}>
                            Chefs
                        </div>
                    </div>
                    {   subchoice === 0 &&
                        deliveryPeople.map((item, index) => {
                            return (
                                <div className="userCard" style = {{marginBottom: "2%"}}>
                                    <div>
                                        <h3>{ item.name }</h3>
                                        <h5>{ item.email }</h5>
                                        <div style = {{display: "grid", gridTemplateColumns: "15% 15% 22% 15% 15%", textAlign: "left"}}>
                                            <p>
                                                Complaints : {item.totalComplaints !== undefined ? item.totalComplaints : 0}
                                            </p>
                                            <p>
                                                Compliments : {item.totalCompliments !== undefined ? item.totalCompliments : 0}
                                            </p>
                                            {(Math.floor(Math.abs(item.totalReviewCount / 3)) === 0 || item.totalReviewCount === undefined) &&
                                                <p>Salary Change : <strong>Nothing</strong></p>
                                            }
                                            {(Math.floor(item.totalReviewCount / 3) > 0) &&
                                                <p style={{color: "green"}}>Salary Change : <strong>Bonus</strong></p>
                                            }
                                            {(Math.floor(Math.abs(item.totalReviewCount / 3)) > 0) && item.totalReviewCount < 0 &&
                                                <p style={{color: "darkred"}}>Salary Change : <strong>Salary Cut</strong></p>
                                            }
                                            <p>
                                                Demotions : {item.demotions !== undefined ? item.demotions : 0}
                                            </p>
                                            <p>
                                                Warnings : {item.warnings !== undefined ? item.warnings : 0}
                                            </p>
                                            <p>
                                                Total Earnings : ${item.totalSpent}
                                            </p>
                                            <p>
                                                Orders Delivered : {item.wallet}
                                            </p>
                                        </div>
                                    </div>
                                    <button onClick={() => {updateRole(item.id, 333)}}>
                                        Fire
                                    </button>
                                </div>
                            );  
                        })
                    }
                    {   subchoice === 1 &&
                        chefPeople.map((item, index) => {
                            return (
                                <div className="userCard" style = {{marginBottom: "2%"}}>
                                    <div>
                                        <h3>{ item.name }</h3>
                                        <h5>{ item.email }</h5>
                                        <div style = {{display: "grid", gridTemplateColumns: "repeat(4, 23%)", textAlign: "left"}}>
                                            <p>
                                                Complaints : {item.totalComplaints !== undefined ? item.totalComplaints : 0}
                                            </p>
                                            <p>
                                                Compliments : {item.totalCompliments !== undefined ? item.totalCompliments : 0}
                                            </p>
                                            {(Math.floor(Math.abs(item.totalReviewCount / 3)) === 0 || item.totalReviewCount === undefined) &&
                                                <p>Salary Change : <strong>Nothing</strong></p>
                                            }
                                            {(Math.floor(item.totalReviewCount / 3) > 0) &&
                                                <p style={{color: "green"}}>Salary Change : <strong>Bonus</strong></p>
                                            }
                                            {(Math.floor(Math.abs(item.totalReviewCount / 3)) > 0) && item.totalReviewCount < 0 &&
                                                <p style={{color: "darkred"}}>Salary Change : <strong>Salary Cut</strong></p>
                                            }
                                            <p>
                                                Demotions : {item.demotions !== undefined ? item.demotions : 0}
                                            </p>
                                        </div>
                                    </div>
                                    <div style={{marginTop: "2%", marginBottom: "1%", textAlign: "center"}}>
                                        <button style={{marginBottom: "15%"}} onClick={() => {updateRole(item.id, 333)}}>
                                            Fire
                                        </button>
                                        <Link to={"/allFoods/" + item.id} style={{color: "#0087bd"}}>
                                            See User Dishes
                                        </Link>
                                    </div>
                                </div>
                            );  
                        })
                    }
                </div>
            }{
                choice === 6 &&
                <div>
                    <div className="ChoicesLink" style={{marginTop: "6%", marginBottom: "4%", justifyContent : "flex-start"}}>
                        <div onClick = {() => {handleJ(0)}} style={j == 0 ? {backgroundColor: "var(--yellow)"} : {}}>
                            Delivery People
                        </div>
                        <div onClick = {() => {handleJ(1)}} style={j == 1 ? {backgroundColor: "var(--yellow)"} : {}}>
                            Chefs
                        </div>
                    </div>
                    {j === 0 &&
                        <div>
                            { 
                            deliveryJobsApplications.map((item) => {
                                return (
                                    <div className="userCard">
                                        <div>
                                            <h3>{ item.name }</h3>
                                            <p>{ item.email }</p>
                                        </div>
                                        <div>
                                            <button onClick={() => {updateRole(item.id, 33)}}>
                                                Approve
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                            }
                        </div>
                    }
                    {j === 1 &&
                        <div>
                            { 
                            chefJobsApplications.map((item) => {
                                return (
                                    <div className="userCard">
                                        <div>
                                            <h3>{ item.name }</h3>
                                            <p>{ item.email }</p>
                                        </div>
                                        <div>
                                            <button onClick={() => {updateRole(item.id, 22)}}>
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
            }
        </div>
    )
}