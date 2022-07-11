const Product = require("../models/product") 
const Cart= require("../models/cart")
exports.getProducts=(req,res,next)=>{
    Product.fetchAll((product)=>{
          res.render('shop/shop',
           {
               prods:product,
               doctitle:"All Product",
               path:"/products"
           });
            
       });
   
       // res.render('shop',{prods:product,doctitle:"shop",path:"/"} );
   }

exports.getIndex=(req,res,next)=>{
    Product.fetchAll((product)=>{
        res.render('shop/index',
         {
             prods:product,
             doctitle:"shop",
             path:"/"
         });
          
     });


}

exports.getCart=(req,res,next)=>{
    Cart.getCart(cart=>{
        Product.fetchAll(products=>{
            
            const cartProducts=[]
            for (product of products){
               
                const cardProductdata=cart.products.find(prod => prod.id === product.id)
                
                 if(cardProductdata){
                    cartProducts.push({productdata:product.title,qty:cardProductdata.qty,id:product.id})
                 }
        
            }
            res.render('shop/cart',{
                doctitle:"My Cart",
                path:"/cart",
                products:cartProducts
            })
        }) 
    })  
}
exports.postCart=(req,res,next)=>{
    const prodId=req.body.productId;
    console.log(prodId)
    Product.findById(prodId,(product)=>{
        const price=product.price
        Cart.addProduct(prodId,price);
    });
    
    res.redirect('/cart')

    // res.render('shop/cart',{
    //     doctitle:"My Cart",
    //     path:"/cart"
    // })
}
exports.getCheckout=(req,res,next)=>{
    res.render('shop/checkout',{
        doctitle:" Check",
        path:"/checkout"
    })
}
exports.getorder=(req,res,next)=>{
    res.render('shop/order',{
        doctitle:" orders",
        path:"/order"
    })
}
exports.postDeleteItem=(req,res,next)=>{
    const prodId=req.body.productId;
    Product.findById(prodId,product=>{
        Cart.deleteProduct(prodId,product.price)
        res.redirect('/cart')

    })
   
}
exports.getproduct=(req,res,next)=>{
    const prodId=req.params.productId;
    Product.findById(prodId,product=>{
        res.render('shop/product-detail',{
            product:product,
            doctitle:" Product Detail",
            path:"/products"

        })
    })
  

}
  

   
   