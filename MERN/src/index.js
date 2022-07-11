const express = require("express")
require('dotenv').config();
const path = require("path")
const app = new express()
const User = require("./database/conn")
const Product =require("./database/conn").Product
const Cart = require("./database/conn").Cart
const static_path = path.join(__dirname, "../public")
const bcrypt = require("bcryptjs");
const { set } = require("mongoose");
const auth = require("../src/middleware/auth")
const cors = require('cors')
const session =require('express-session')
app.use(express.urlencoded({ extended: true }));
app.use(express.static(static_path))
const cookieParser = require('cookie-parser');
const { json } = require("body-parser");
const { pid } = require("process");
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.set("view engine", "ejs")
app.set("views", "views")
app.use(session({secret:"my secret",resave:false,saveUninitialized:false}))

app.use(function(req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});



app.get("/", (req, res) => {
    console.log("get index",req.session.isloggedIn);
    res.render("index", {
        title: "index",
        isAuthenticated:false
    })
})
// app.get("/register", (req, res) => {
//     res.render("register", {
//         title: "register",
//         isAuthenticated:req.session.isloggedIn
        
//     })

// })

///************* */ for ANGUALR project created for this mean project upperside get api work for regsitration ********************
app.get("/register",async(req,res)=>{
    const userAlldata = await User.find()
    res.send(JSON.stringify(userAlldata))

})
app.get("/register/:id",async(req,res)=>{
    const id = req.params.id
    const userAlldata = await User.findById({_id:id})
    res.json(userAlldata)

})
app.patch("/register/:id",async(req,res)=>{
    try{
        const id = req.params.id
        console.log("---------->",id)
        const data = await User.findByIdAndUpdate({_id:id},req.body,{new:true})
        // data.save()
        res.json("data update sucessfully")
    }catch(e){
        res.status(400).json(e)
        console.log(e,"error");
    }
    })
app.delete("/register/:id",async(req,res)=>{
    try{
        const id = req.params.id
        console.log("----------as>",id)
        const data = await User.findByIdAndDelete({_id:id})
        res.json("data delete sucessfully")

    }catch{

    }
})


app.get("/product",async(req,res)=>{
    try{
        const productAlldata= await Product.find()
        res.send(JSON.stringify(productAlldata))


    }catch(err){
        res.json("something is wrong in product please wait")

    }

})

app.get("/product/:id  ",async(req,res)=>{
    try{
        const id = req.params.id
        const productdata = await Product.findById({_id:id})
        res.json(productdata)
    }catch{

    }
})

app.get("/cart/:id",async(req,res)=>{
    try{
        id = req.params.id
        console.log(id);
        const findproductbyid = await Cart.findOne({userid:id})
        const counts = {};
        const Array = findproductbyid.productsid
        Array.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        console.log(counts) 
       
   
        res.status(200).json({
            success: true,list:counts
        })



    }catch(e){
        console.log(e);
    }
})

app.post("/cart",async(req,res)=>{
    try{
    uid=req.body.uid
    const pid1=req.body.pid
    const finduserid = await Cart.findOne({userid:uid})
 
    if(!finduserid){
        // prod=finduserid.productsid
        const createuser = new Cart({
        
            userid:uid,
            productsid:[pid1.toString()]

        })
        await createuser.save()
        res.status(200).json({
            success: true,message: "data added in cart"
        })
    }
    else{
        console.log("outside");

        var data11=await Cart.updateOne(
            { _id: finduserid._id }, 
            { $push: { productsid: pid1.toString() } },
        
        );
        res.status(200).json({
            success: true,message: "data updated in cart"
        })

        
    }
    }catch(e){
        console.log(e)
        console.log("error in cart");
        
    }
})



app.delete("/cart/:id",async(req,res)=>{
    try{
        uid = req.params.id
        pid1 = req.query.pid
        const finduserid = await Cart.find({userid:uid})
        id= finduserid[0]._id
        indexx =finduserid[0].productsid.indexOf(pid1)
        s=finduserid[0].productsid.splice(indexx,1)
        data=finduserid[0].productsid
        console.log(data);
        await  Cart.updateOne( { _id:id}, { productsid: data })
        
        res.status(200).json({
            success: true
        })
        


        // const re = await Cart.deleteOne({})
        // // productid=finduserid.map(x => x.productsid);
        // index = finduserid.map(function(item) {
        //      return item.productsid.indexOf(pid1)
            
        // })
        // console.log(index[0]);
        // deleteitem = finduserid.map(function(item) {return item.productsid.splice(1,1)} )
        // console.log(deleteitem)
        // productid=finduserid.map(x => x.productsid);
        
       


        
        // res.send("done")



    }catch{

    }
})


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.get("/secret",auth, (req, res) => {
    if(req.session.name){
        try{
            console.log("get secret",req.session.isloggedIn);
            res.render("secret", {
                title: "bhana",
                token : req.cookies.jwt,
                isAuthenticated:req.session.isloggedIn
                
            })
    
        }catch{
            res.redirect("/")
    
        }

    }
        
       
else {
        res.redirect("/")

    }
   

})
app.get("/logout", auth,async(req ,res,next)=>{
    try{ 
        //for single token delete
        // req.user.tokens = req.user.tokens.filter(currElmt=>{
        //     return currElmt.token !== req.token
        // }) 
        req.user.tokens=[]
        res.clearCookie("jwt")  
        res.clearCookie("connect.sid")
        console.log(req.session.name);
        req.session.destroy(); 
        console.log("session",req.session);
        console.log("logout sucessfully ")
         await req.user.save()
         res.redirect("/")
    }catch(e){
       
        res.status(500).send(e)
    }
})
app.post("/register", async (req, res, next) => {

    try {
        const password = req.body.password
        const confirmpassword = req.body.confirmpassword
        if (password === confirmpassword) {
            const createuser = new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                phone: req.body.phone,
                age: req.body.age,
                gender: req.body.gender,
                password: password,
                confirmpassword: confirmpassword
            })
         
            const token = await createuser.generateAuthToken()

            
            res.cookie("jwt",token,{
                // expires:new Date(Date.now() + 30000),
                httpOnly:true   
            });
           
            const registered = await createuser.save()
            res.status(200).json({
                success: true,message: "regsiter sucessfully",Token:token
            })
            // res.status(201).redirect('/')

        } else {
            res.status(400).json({
                success: true,message: "password are not matched"
            })
        }
        
       

    } catch (e) {
        res.status(400).send(e)
        console.log("error page part");
    }

})
app.get("/login", (req, res) => {
    console.log("ckckckckck",req.get('Cookie'));
    res.render("login", {
        title: "login",
       

    })
})
app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await User.findOne({ email: email })
      
        const ismatch = await bcrypt.compare(password, useremail.password)
        // const token = await useremail.genrateLoginToken(useremail)
        const token = await useremail.generateAuthToken()
        req.session.isloggedIn =true;
        req.session.name = useremail.firstname
         res.cookie("jwt",token,{
                expires:new Date(Date.now() + 600000),
                httpOnly:true   
            });
           
        
        if (ismatch) {
            console.log("matched")
            // res.status(201).redirect('/secret')
            res.status(200).json({
                success: true,message: "login sucessfully",id:useremail._id
            })
        } else {
            console.log(" not matched")
            res.status(400).json({
                success: false,
                message: "Invalid Password"
            })
        }

    } catch (e) {
        res.status(400).json({
            success: false,
            message: "Invalid Login"
        })

    }

})
app.listen(8000, () => {
    console.log("running")
})                                 