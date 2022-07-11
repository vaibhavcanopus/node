const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs");

mongoose.connect("mongodb://localhost:27017/student-api").then( ()=>{
    console.log(" database connected")
   
    }
).catch((e)=>{ console.log(e)})


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
    },
    password:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    resetlink:{
        data:String,
        default:''
    }
    
    
    })

StudentSchema.pre("save", async function(req,res,next){
        if (this.isModified("password")){
        this.password =await bcrypt.hash(this.password ,10)
    }
        next();
    })

    // create collections
    const Student= new mongoose.model("student",StudentSchema)
    module.exports=Student;


