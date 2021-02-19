import React,{useState,useEffect,useContext} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
const GetOtp = ()=>{
    const {state,dispatch}=useContext(UserContext)
    const history=useHistory()
    //const [phone,setPhone] = useState("")
    /*const history = useHistory()
    
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    useEffect(()=>{
       if(url){
        fetch("/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,
                body,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
    
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               M.toast({html:"Created post Successfully",classes:"#43a047 green darken-1"})
               history.push('/')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    },[url])
  */
   const postData = ()=>{
       
       fetch("/protect",{
           method:"post",
           headers:{
            "Content-Type":"application/json",
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           },
           body:JSON.stringify({
               
            phone:state.phone
            
            
            
        })
           
       })
       .then(res=>res.json())
       .then(data=>{
          if(data.error)
          M.toast({html:data.error})
          else{
          M.toast({html:data.message})
          history.push('/door')
          }
       })
       .catch(err=>{
       console.log(err);
       })

    
   }
 

   return(
       <div className="card input-filed"
       style={{
           margin:"30px auto",
           maxWidth:"500px",
           padding:"20px",
           textAlign:"center"
       }}
       >
           
          
           
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
             onClick={()=>postData()}
            
            >
                Enter room
            </button>

       </div>
   )
}


export default GetOtp

/*
  <input
          type="Number"
          placeholder="phoneNo"
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
          
          />
          */