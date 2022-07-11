const express =require("express")
const path =require('path')
const router =express.Router();
const admindata = require('./admin')
 
//without controller
// router.get('/',(req,res,next)=>{
//     console.log("shop",admindata.products);
//     // res.sendFile(path.join(__dirname,'../','views','shop.html') );
//     //using pug tempalte engine
//     const product = admindata.products
   
//     res.render('shop',{prods:product,doctitle:"shop",path:"/"} );
// })
// module.exports=router; 
//from contoller
const getControllerData =require('../controllers/products')
router.get("/",getControllerData.getProducts)
module.exports=router; 