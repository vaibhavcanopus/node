const Product = require("../models/product");

exports.getAddProduct=(req, res, next) => {
    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
    res.render('add-product',{
      pageTitle:'Add Product',
      path:'/admin/add-product',
      formsCSS:true,
    })
  }

  exports.postAddProduct=(req, res, next) => {
    // products.push({ title: req.body.title });
    const title=req.body.title
    const price =req.body.price
    const description = req.body.desc
    const imageUrl = req.body.imageurl
    const product = new Product(null,title,imageUrl,price,description);
    product.save()
    res.redirect('/');
  }


