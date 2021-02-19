import React,{useState,useContext} from 'react'
import {UserContext} from '../../App'
import M from 'materialize-css'
const Profile=()=>{
    const {state,dispatch}=useContext(UserContext)
    const [link,setLink]=useState();

    const PostData = ()=>{
       
        fetch("/verified",{
            method:"post",
            headers:{
             "Content-Type":"application/json",
                //"Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                
             phone:state.phone,
             otp:link

             
             
             
         })
            
        })
        .then(res=>res.json())
        .then(data=>{
           if(data.error)
           M.toast({html:data.error,classes:"#c62828 red darken-3"})
           else{
            M.toast({html:data.message,classes:"#43a047 green darken-1"})

           }
           
        })
        .catch(err=>{
        console.log(err);
        })
 
     
    }
    
    
    return(
        <div className="mycard">
        <div className="card auth-card input-field">
        
        

        <input
          type="Number"
          placeholder="code"
          value={link}
          onChange={(e)=>setLink(e.target.value)}
          
          />
             <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
          onClick={()=>PostData()}>
              Enter Otp
          </button>
        
      
        </div>
        </div>
    )
}

export default Profile