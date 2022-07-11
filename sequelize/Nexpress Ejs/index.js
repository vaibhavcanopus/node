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
const bodyParser = require('body-parser')
const adminRoutes=require("./routes/admin")
const path=require("path")
const shoproute=require("./routes/shop")
const getError=require("./controllers/error")
app.use(express.static(path.join(__dirname,"public")))
app.use(bodyParser.urlencoded({extends:false}));
app.use(shoproute);
app.use('/admin',adminRoutes);
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


app.listen(8080);