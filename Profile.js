import React,{useState,useContext} from 'react'
import {UserContext} from '../../App'
const Profile=()=>{
    const {state,dispatch}=useContext(UserContext)
    
    
    return(
        <div className="mycard">
        < div className="card auth-card input-field">
        
        <h4> Your Email : {state.email} </h4>
        
        <h4> Your Phone : {state.phone} </h4>
        
      </div>
        </div>
    )
}

export default Profile