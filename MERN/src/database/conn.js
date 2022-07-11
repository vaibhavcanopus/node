const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt  = require("bcryptjs")
const jwt = require("jsonwebtoken")
require('dotenv').config();
mongoose.connect("mongodb://localhost:27017/UserData").then( ()=>{
    console.log(" database connected")
    }
).catch((e)=>{ console.log(e)})


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    imgurl:{
        type:String,
        trim:true,
        required:true
    },
    category:{
        type:String,
        trim:true
    }

    
})



const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            validator.isEmail(value)
        }

    },
    phone:{
        type:Number,
        required:true,
        trim:true
    },
    age:{
        type:Number,
        required:true,
        trim:true
    },
    gender:{
        type:String,
        required:true,
        trim:true

    },
    password:{
        type:String,
        required:true,
  
    },
    confirmpassword:{
        type:String,
        required:true,
     
    },
    tokens:[{
        token:{
            type:String,
            required:true,
        }
    }]
})

userSchema.pre("save",async function(next){
    if (this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
        this.confirmpassword= await bcrypt.hash(this.password,10)
    }
    next();
})
//genrating token using jwt
userSchema.methods.generateAuthToken = async function(next){
    try{    
    const token =  jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({token:token})
    await this.save();  
    return token;

    }catch(e){
        console.log(e);
    }
   
}

userSchema.methods.genrateLoginToken = async(useremail)=>{
    console.log(useremail._id)
    const token = jwt.sign({_id:useremail._id},process.env.SECRET_KEY)
   
}




const cartSchema = new mongoose.Schema({
    userid:String,
    productsid:[]
})


const User = new mongoose.model("user",userSchema)
const Product= new mongoose.model("product",productSchema)
const Cart = new mongoose.model("cart",cartSchema)

module.exports= User;
module.exports.Cart=Cart;
module.exports.Product = Product;