const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET,authToken,accountSID,serviceID} = require('../keys')
const client=require('twilio')(accountSID,authToken)
//const crypto = require('crypto')



const requireLogin = require('../middleware/requireLogin')


router.post("/protect",requireLogin,(req,res)=>{
    const{phone}=req.body;
    if( !phone){
        return res.status(422).json({error:"please add all the fields"})
     }
     User.findOne({phone:phone})
    .then((savedUser)=>{
        if(!savedUser){
          return res.status(422).json({error:"please enter registered number only!!"})
        }})
    
    
     client
		.verify
		.services(serviceID)
		.verifications
		.create({
			to:`+91${phone}`,
            channel:"sms"
			
		})
		.then((data)=>{
			//console.log(data);
			
			//res.redirect(`/verifyotp/${req.body.phone}`);
			//res.status(200).send(data);
            res.json({message:"otp sent"})		
		});
    
})





router.post('/signup',(req,res)=>{
    const {phone,email,password} = req.body 
    if(!email || !password || !phone){
       return res.status(422).json({error:"please add all the fields"})
    }
    User.findOne({phone:phone})
    .then((savedUser)=>{
        if(savedUser){
          return res.status(422).json({error:"user already exists with that number"})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
              const user = new User({
                  email,
                  password:hashedpassword,
                  phone,
                  
              })
      
              user.save()
              .then(user=>{
                  // transporter.sendMail({
                  //     to:user.email,
                  //     from:"no-reply@insta.com",
                  //     subject:"signup success",
                  //     html:"<h1>welcome to instagram</h1>"
                  // })
                  res.json({message:"saved successfully"})
              })
              .catch(err=>{
                  console.log(err)
              })
        })
       
    })
    .catch(err=>{
      console.log(err)
    })
  })
  
  
  router.post('/signin',(req,res)=>{
      const {phone,password} = req.body
      if(!phone || !password){
         return res.status(422).json({error:"please add phone or password"})
      }
      User.findOne({phone:phone})
      .then(savedUser=>{
          if(!savedUser){
             return res.status(422).json({error:"Invalid phone or password"})
          }
          bcrypt.compare(password,savedUser.password)
          .then(doMatch=>{
              if(doMatch){
                   //res.json({message:"successfully signed in"})
                 const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                 const {_id,phone,email} = savedUser
                 res.json({token,user:{_id,phone,email}})
              }
              else{
                  return res.status(422).json({error:"Invalid phone or password"})
              }
          })
          .catch(err=>{
              console.log(err)
          })
      })
  })
  








module.exports = router