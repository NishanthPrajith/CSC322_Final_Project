import './userProfile.css';
import { useAuth } from '../contexts/Authcontext';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { BiWallet } from "react-icons/bi";
import { Link } from 'react-router-dom';

export default function UserProfile() {

    const { orders, userWarnings, writeOrderReviewUser, handleLogout, quitAccount, updateWallet, userRole, userWallet, userName } = useAuth();

    const rating = useRef();
    const chefRating = useRef();
    const deliveryRating = useRef();

    const cardNumber = useRef();
    const money = useRef();

    var done = [1, 2, 3, 4, 5];
    
    useEffect(() => {
        console.log(typeof done);
        console.log(done);
        console.log(orders);
    }, []);

    async function deleteMe() {
        await quitAccount();
    }

    function openForm() {
        console.log("Open form");
        var a = document.getElementsByClassName("WalletForm");
        a[0].style.display = "block";
    }

    const validateCardNumber = number => {
        //Check if the number contains only numeric value  
        //and is of between 13 to 19 digits
        const regex = new RegExp("^[0-9]{13,19}$");
        if (!regex.test(number)){
            return false;
        }
      
        return luhnCheck(number);
    }
    
    const luhnCheck = val => {
        let checksum = 0; // running checksum total
        let j = 1; // takes value of 1 or 2
    
        // Process each digit one by one starting from the last
        for (let i = val.length - 1; i >= 0; i--) {
          let calc = 0;
          // Extract the next digit and multiply by 1 or 2 on alternative digits.
          calc = Number(val.charAt(i)) * j;
    
          // If the result is in two digits add 1 to the checksum total
          if (calc > 9) {
            checksum = checksum + 1;
            calc = calc - 10;
          }
    
          // Add the units element to the checksum total
          checksum = checksum + calc;
    
          // Switch the value of j
          if (j == 1) {
            j = 2;
          } else {
            j = 1;
          }
        }
      
        //Check if it is divisible by 10 or not.
        return (checksum % 10) == 0;
    }

    function closeForm(e) {
        e.preventDefault();
        console.log("Close form");
        var a = document.getElementsByClassName("WalletForm");
        a[0].style.display = "none";
        cardNumber.current.value = "";
        money.current.value = 0;
    }

    function getRandomProfile(a) {
        return "url('https://avatars.dicebear.com/api/initials/:" + a + ".svg')";
    }

    async function addMoney(e) {
        e.preventDefault();
        var a = cardNumber.current.value;
        var b = money.current.value;
        if (b < 0) {
            alert("Please enter a positive amount!");
        } else if(b > 101) {
            alert("Please enter an amount less than or equal to 100!"); 
        } else if (b == "" || b == null) {
            alert("Please enter an amount!");
        } else if (validateCardNumber(a) == false) {
            alert("Please enter a valid card number!");
        } else {
            alert("Your money has been added to your wallet!");
            await updateWallet(b, "add");
            cardNumber.current.value = "";
            money.current.value = 0;

            closeForm(e);
        }
    }

    return (
        <div className='userProfile'>
            <div className='ProfilePic'>
                <div className='profileImage' style={{backgroundImage: getRandomProfile(userName)}}>
                </div>
            </div>
            <h1 className = "userProfileTitle">{userName}</h1>
            <div className='deleteAccount'>
                <button onClick={() => deleteMe()}>Delete Account</button>
            </div>
            <div className='userMetaData'>
                <div className='userMetaDataOne'>
                    <h4>Warnings</h4>
                    <h3>{userWarnings}</h3>
                </div>
                <div className='userMetaDataTwo'>
                    <h4>Your Current Level</h4>
                    {userRole === 11 &&
                        <h3>Regular</h3>
                    }
                    {userRole === 111 &&
                        <h3 style={{color: "deeppink"}}>*VIP*</h3>
                    }
                </div>
                <div className='userMetaDataThree'>
                    <h4>Wallet</h4>
                    <div style = {{
                        display: "grid",
                        textAlign: "right",
                        gridTemplateColumns: "52% 48%",
                        alignItems: "center",
                        }}>
                        <h3>$ {userWallet}</h3>
                        <div className='addMoney'>
                            <button onClick={openForm}>
                                <BiWallet />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='WalletForm'>
                <div className='WalletBox'>
                    <div style={{display: "grid", justifyItems: "center"}}>
                        <h1>Wallet</h1>
                        <form onSubmit={() => {return false}}>
                            <label>Card Number</label>
                            <input type="text" ref={cardNumber}/>
                            <label>Amount</label>
                            <input type="number" ref={money} min={0} max={101} />
                            <button className='AddToWallet' onClick={addMoney}>
                                Add Money
                            </button>
                            
                            <button className='closeButtonForm' onClick={closeForm}>
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div style={{marginTop: "7%"}}>
                <h2>Previous Orders</h2>
                {
                orders.map((item, i) => {
                    return (
                        <div className='UserOrderCard' key={i}>
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <h2>Order #{i + 1}</h2>
                                <h5>{item.orderDate}</h5>
                            </div>
                            <div className='userCardInner'>
                                <div>
                                    {
                                        item.order.map((v) => {
                                            return (
                                                <p><strong>{v.name}</strong> x {v.count}</p>
                                            )
                                        })
                                    }
                                </div>
                                <div>
                                    <h3>${item.totalPrice}</h3>
                                </div>
                            </div>
                            {
                                item.deliveryUserId !== "" &&
                                <div className='OrderReview'>
                                    <button>
                                        {!item.userReviewed? 
                                        <Link to = {"/orderReview/" + i}>
                                            Review Order
                                        </Link> : "Order Reviewed"}
                                    </button>
                                </div>
                            }
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}