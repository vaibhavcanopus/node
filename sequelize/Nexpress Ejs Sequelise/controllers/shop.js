const Product = require("../models/product") 
const Cart= require("../models/cart");
exports.getProducts=(req,res,next)=>{
    Product.findAll().then(product=>{
          res.render('shop/shop',
           {
               prods:product,
               doctitle:"All Product",
               path:"/products"
           });
            
       }).catch(err=>{console.log(err)})
   
       // res.render('shop',{prods:product,doctitle:"shop",path:"/"} );
   }

exports.getIndex=(req,res,next)=>{
    Product.findAll().then(product=>{
        
        res.render('shop/index',
        {
            prods:product,
            doctitle:"shop",
            path:"/"
        });

    }).catch(err=>{
        console.log(err)
    })
    // Product.fetchAll((product)=>{
       
          
    //  });


}

exports.getCarts = (req, res, next) => {
    let id=1;
    Cart.findByPk(id).then(cart=>{

    })
    req.user
      .getCart()
      .then(cart => {
        return cart
          .getProducts()
          .then(products => {
            res.render('shop/cart', {
              path: '/cart',
              pageTitle: 'Your Cart',
              products: products
            });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };
  
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
    Product.findByPk(prodId,product=>{
        Cart.deleteProduct(prodId,product.price)
        res.redirect('/cart')

    })
   
}
exports.getproduct=(req,res,next)=>{
    const prodId=req.params.productId;
    Product.findByPk(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        doctitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};
  

   
   