const Product = require("../models/product")
exports.getAddProduct=(req,res,next)=>{
    
     res.render('admin/add-product',{
         doctitle:"My Product",
         path:'/admin/add-product'} 
               );
}
exports.postAddProduct = (req,res,next)=>{
    const prod =new Product(req.body.title);
    prod.save();


    res.redirect("/")
}

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
