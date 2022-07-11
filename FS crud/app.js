const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set("views","views")
const multer = require("multer")

app.use('/admin', adminData.routes);
app.use(shopRoutes);

// app.use((req, res, next) => {
//     res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
// 
app.use((req, res, next) => {
       res.status(404).render('404',{pageTitle:"page not found"});
    });

app.listen(3000);
