const mongoose = require('mongoose')
const validation = require("validator")
const { STRING } = require('mysql/lib/protocol/constants/types')
mongoose.connect('mongodb://localhost:27017/employee').then(res=>{
  console.log("database connected")    
})

const employeeShema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:[true,"email already exist"],
        
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

const Employee = new mongoose.model("employee",employeeShema)
module.exports = Employee
