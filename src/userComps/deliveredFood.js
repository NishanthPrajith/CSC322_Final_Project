import './userProfile.css';
import { useState } from 'react';

export default function DeliveredFood(props){
    const [open, setOpen] = useState(false)
   return(
       <div>
           <h2>{props.name}</h2>
           <h3>{props.date}</h3>
           <h4>{props.quantity}</h4>
           <h5>{props.customer}</h5>
           <button>Options</button>
           
       </div>
   )
}