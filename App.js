import React,{useEffect,createContext,useReducer,useContext} from 'react';

import Navbar from './components/Navbar'
import "./App.css"
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from "./components/screens/Home"
import Signin from "./components/screens/Signin"
import Signup from "./components/screens/Signup"
import Profile from "./components/screens/Profile"
import GetOtp from "./components/screens/GetOtp"
import Door from "./components/screens/Door"
import KommunicateChat from './chat';
import {reducer,initialState} from './reducers/useReducer'
 export const UserContext = createContext()


 const Routing=()=>{

   const history=useHistory();
   const {state,dispatch}=useContext(UserContext)

   useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      history.push('/profile');
    }
    else
    history.push('/signin')
   },[])
   return (
     <Switch>
    <Route exact path='/'><Home/></Route> 
    <Route path='/signin'><Signin/></Route> 
    <Route path='/signup'><Signup/></Route> 
    <Route path='/profile'><Profile/></Route> 
    <Route path='/GetOtp'><GetOtp/></Route> 
    <Route path='/Door'><Door/></Route> 
    

    </Switch>
   )
 }


function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <Navbar />
    <Routing/> 
    
   

    <KommunicateChat/>
    
    
  </BrowserRouter>  
  </UserContext.Provider>
  );
}

export default App;
