const Product = require("../models/product")
exports.getAddProduct=(req,res,next)=>{
   
    
     res.render('admin/add-product',{
         doctitle:"My Product",
         path:'/admin/add-product',
        
         
        } 
         
               );
}

exports.postAddProduct = (req,res,next)=>{
    const title=req.body.title;
    const img =req.body.imageUrl;
    const price=req.body.price;
    const desc =req.body.desc;
    const prod =new Product(null,title,img,price,desc);
    prod.save();
    res.redirect("/")
}


exports.posteditProduct = (req,res,next)=>{
    const  prodId=req.body.productId;
    console.log("bhana", prodId);
    const updatedtitle=req.body.title;
    const updatedimg =req.body.imageUrl;
    const updatedprice=req.body.price;
    const updateddesc =req.body.desc;
    const updatedprod =new Product(prodId,updatedtitle,updatedimg,updatedprice,updateddesc);
    updatedprod.save();
    res.redirect("/admin/product")
}

exports.geteditProduct=(req,res,next)=>{
    const  prodId=req.params.productId;
    Product.findById(prodId,product=>{
        res.render('admin/edit-product',{
            product:product,
            doctitle:" Edit Product Detail",
            path:"/edit-product"

        })
    })      
}
exports.getProduct=(req,res,next)=>{
    Product.fetchAll((product)=>{
        res.render('admin/product',
         {
             prods:product,
             doctitle:"admin Product",
             path:"/admin/product"
         });
          
     });

}

exports.postDeleteProduct=(req,res,next)=>{
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/admin/product');

}