const validator = require("validator")

exports.Emailvalidation = async(req,res,next)=>{
    const email=validator.isEmail(req.body.email)
  
        if(email){
            next()
        }else{
            res.json({success:false, message :"please enter valid email"})
        }

    }