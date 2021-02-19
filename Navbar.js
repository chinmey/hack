import React from 'react';
import {Link} from 'react-router-dom'
//import imgg from './a.png'
/*<b>MyStay</b>*/

const Navbar=()=>{
    return (
        <nav>
    <div className="nav-wrapper blue">
      <Link to="#" className="brand-logo left"><b>MyStay</b></Link>
      <ul id="nav-mobile" className="right ">
        <li><Link to="/signin">Signin</Link></li>
        <li><Link to="/signup">Signup</Link></li>
       
        <li><Link to="/GetOtp">Enter Room</Link></li>
        
      </ul>
    </div>
  </nav>
    )
}

export default Navbar

/*
 <li><Link to="/profile">Profile</Link></li>
 */