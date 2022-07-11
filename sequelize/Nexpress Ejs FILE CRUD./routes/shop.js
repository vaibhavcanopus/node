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
const ShopController =require('../controllers/shop')
router.get("/",ShopController.getIndex)
router.get("/products",ShopController.getProducts)
router.get("/cart",ShopController.getCart)
router.post("/cart",ShopController.postCart)
router.get("/products/:productId",ShopController.getproduct)
router.get("/order",ShopController.getorder)
router.get("/checkout",ShopController.getCheckout)
router.post("/cart-delete-item",ShopController.postDeleteItem)

module.exports=router; 