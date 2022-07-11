const mongoose = require("mongoose");
const validator = require("validator");
const StudentSchema = new mongoose.Schema({
name:{
    type:String,
    required:true,
    minlength:3
},
email:{
    type:String,
    required:true,
    unique:[true,"email already exist"],
    validate(value){
     if(!validator.isEmail(value)) {
        throw new Error("Invalid Email")
     }
    }
},
phone:{
    type:Number,
    minlength:10,
    maxlength:10,
    required:true,
    unique:[true," number is  already regsiter"]

},
address:{
   type:String, 
   required:true
}


})
// create collections
const Student= new mongoose.model("student",StudentSchema)
module.exports=Student;