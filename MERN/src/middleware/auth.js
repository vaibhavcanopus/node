const  jwt = require("jsonwebtoken")
const User = require("../database/conn")
require("dotenv").config()

 

const auth =async(req,res,next)=>{
    try{
      const token =req.cookies.jwt;
     
      const verifyUser = jwt.verify(token,process.env.SECRET_KEY)
      console.log("safdfddf")
      // console.log("dsa",verifyUser)
      const user =  await User.findOne({_id:verifyUser._id})
      // console.log(user)
      req.user=user
      req.token= token
      next()
      


    }catch(err){
        res.redirect("/login")

    }
}

module.exports=auth