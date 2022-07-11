;
const { redirect } = require("express/lib/response");
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
    const imgUrl =req.body.imageUrl;
    const price=req.body.price;
    const desc =req.body.desc;
    req.user.createProduct({
        title:title,
        imgUrl:imgUrl,
        price:price,
        description:desc ,        
    }).then(result=>{
        console.log("save sucessfully")
        res.redirect('/')
        }).catch(err=>{
            console.log(err)
        })
    // const prod =new Product(null,title,img,price,desc);
    // prod.save();
    // res.redirect("/")
   
}


exports.posteditProduct = (req,res,next)=>{
    const  prodId=req.body.productId;
    console.log("bhana", prodId);
    const updatedtitle=req.body.title;
    const updatedimg =req.body.imageUrl;
    const updatedprice=req.body.price;
    const updateddesc =req.body.desc;
    Product.findByPk(prodId).then(
        product=>{
            product.title=updatedtitle,
            product.price=updatedprice,
            product.description=updateddesc,
            product.imgUrl=updatedimg
            product.save()
        }).then(result=>{
            console.log("updates file")
            res.redirect("/admin/product")

        }).catch(err=>console.log(err))
   
 
    
}

exports.geteditProduct=(req,res,next)=>{
    const  prodId=req.params.productId;
    req.user.getProduct({where:{id:prodId}}).then(product=>{
        const  prod=product[0];
        if(!prod){
            return redirect("/");
        }
    // Product.findByPk(prodId).then(product=>{
        res.render('admin/edit-product',{
            product:product,
            doctitle:" Edit Product Detail",
            path:"/edit-product"

        })

    })
    // Product.findById(prodId,product=>{
        
    // })      
}
exports.getProduct=(req,res,next)=>{
    Product.findAll().then(product=>{
        res.render('admin/product',
         {
             prods:product,
             doctitle:"admin Product",
             path:"/admin/product"
         });
          
     }).catch(err=> console.log(err))

}

exports.postDeleteProduct=(req,res,next)=>{
    const prodId = req.body.productId;
    // Product.deleteById(prodId);
    Product.findByPk(prodId)
    .then(product=>{ return product.destroy();
    })
    .then(result=>{ 
     console.log("destroyed item");
     res.redirect('/admin/product')})
    .catch(err => console.log(err));


}