const { redirect } = require("express/lib/response");
const Product = require("../models/product")

exports.getproducts=(req, res, next) => {
  const product = Product.fetchAll(products=>{
    res.render('shop',
    {pageTitle:"shop", 
    prods:products,
    path:"/",
    hasProducts: products.length>0,
  } )
  });

    // res.sendFile(path.join(__dirname,'../' , 'views', 'shop.html'));
  
  }

  exports.editproduct=(req,res,next)=>{
    const prodid = req.params.productID 
    Product.FindById(prodid,product=>{
    res.render('editshop',
    {pageTitle:"shop", 
    prods:product,
    path:"/edit-product",
   
  } )

    })
    // return redirect('/')

  }

  exports.postEditProduct=(req,res,next)=>{
    console.log("bhana",req.params.productID)
    const prodid = req.params.productID ;
    const updatedTitle =req.body.title ;
    const updatedprice= req.body.price;
    const updatedDesc= req.body.desc 
    const updatedimageurl = req.body.imageurl 
    const updatedProducts = new Product(prodid,updatedTitle,updatedimageurl,updatedprice,updatedDesc)
    updatedProducts.save();
    res.redirect("/")

  }

  exports.postImage=(req,res,next)=>{
    const image = req.body.image
  }

  exports.DeleteProduct=(req,res,next)=>{
    const prodID = req.body.productID
  
    
    Product.delete(prodID);
    res.redirect("/")
      

  }