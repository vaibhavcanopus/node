// const express =require("express")
// const path =require('path')
// const router =express.Router();
// const admindata = require('./admin')
 
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
const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getproduct);

router.get('/cart', shopController.getCarts);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postDeleteItem);

router.get('/orders', shopController.getorder);

router.get('/checkout', shopController.getCheckout);

module.exports = router;
