// const http =require("http");
// const express =require("express");
// const app=express();
// const bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({extends:false}))
// app.use('/add-product',(req,res,next)=>{
  
//      res.send('<form action="/product" method="POST"><input type="text" name="title"> <input type="text" name="email"> <button type="submit">send</button></form>');
// next();

// });
// app.post("/product",(req,res,next)=>{
//      console.log(req.body)
//      res.redirect("/")
// })

// app.use('/',(req,res,next)=>{
//     res.send('<h1 > hello vaibhav</h1>');

// });
  
// app.listen(8080);


const http =require("http");
const express =require("express");
const app=express();
const bodyParser = require('body-parser');
const adminRoutes=require("./routes/admin");
const path=require("path");
const shoproute=require("./routes/shop");
const getError=require("./controllers/error");
const sequelize=require('./util/databases');
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const { listen } = require("express/lib/application");

app.use(express.static(path.join(__dirname,"public")))
app.use(bodyParser.urlencoded({extends:false}));
app.use(shoproute);
app.use((req, res, next) => {
    User.findByPk(1)
      .then(user => {
         
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  });
  
app.use('/admin',adminRoutes);
// db.execute('SELECT * FROM  products').then(result=>{
//     console.log(result);
// }).catch(err=>{
//     console.log(err);
// })
//for pug  Engine
// app.set("view engine",'pug');
//for EJS Engine
app.set("view engine" ,"ejs")
app.set("views","views")

// app.use((req,res,next)=>{
//     res.status(404).render('404',{doctitle:"Page Not Found"})
//     // res.status(404).sendFile(path.join(__dirname,"./","views","404Page.html"))
// })
app.use(getError.Error404)




Product.belongsTo(User, {constraints:true,onDelete:"CASCADE"});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart ,{through:CartItem});
// normal connection
// sequelize.sync({force:true}).then(result=>{
//     // console.log(result);
//     app.listen(8081);
// }).catch(err=>{
//         console.log(err)
//     })


//  connection  with two model and checked for user;
sequelize
  // .sync({ force: true })
  .sync()
  .then(result => {
    return User.findByPk(1);
    // console.log(result);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'Max', email: 'test@test.com' });
    }
    return user;
  })
  .then(user => {
    // console.log(user);
    return user.createCart();
  }).then(user=>{
    console.log("fdsaaaaaaaaaaaaaaaaaaaa")
    }).then(us=>{ app.listen(8080)}
       
    )
  


.catch(err=> {console.log(err) })   