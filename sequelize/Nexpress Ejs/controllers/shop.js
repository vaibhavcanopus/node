const Product = require("../models/product")
exports.getProducts=(req,res,next)=>{
    Product.fetchAll((product)=>{
           res.render('shop/shop',
           {
               prods:product,
               doctitle:"shop",
               path:"/"
           });
            
       });
   
       // res.render('shop',{prods:product,doctitle:"shop",path:"/"} );
   }
   
   