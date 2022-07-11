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
