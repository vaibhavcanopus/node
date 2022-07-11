const express =require("express")
const router =express.Router();
const AdminController =require('../controllers/admin')
// const adminController =require('../controllers/admin')


// router.get('/add-product',(req,res,next)=>{
//   // res.sendFile(path.join(__dirname,'../','views','add-product.html') );
//   // res.sendFile(path.join(rootDir,'views','add-product.html')); 
//    //using pug tempalte engine
//    res.render('add-product',{prods:product,doctitle:"My Product",path:'/admin/add-product'} );
// });

// router.post("/add-product",(req,res,next)=>{
  
//     product.push({title:req.body.title })
//     res.redirect("/")
// })
// module.exports.routes=router;
// exports.products=product;

//with the help of conroller
// admin/add-product
router.get('/add-product',AdminController.getAddProduct);
router.get('/product',AdminController.getProduct);
router.get('/edit-product/:productId',AdminController.geteditProduct)
router.post("/edit-product",AdminController.posteditProduct)
router.post("/add-product",AdminController.postAddProduct)
router.post("/delete-product",AdminController.postDeleteProduct)
module.exports = router; 