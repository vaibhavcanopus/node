// var http = require('http');
// var fs = require('fs');
// http.createServer(function (req, res) {
//   fs.readFile('demofile1.html', function(err, data) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(data);
//     return res.end();
//   });
// }).listen(8080)
// var fs = require('fs');

// fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
//   if (err) throw err;
//   console.log('Saved!');
// });
// var fs = require('fs');

// fs.writeFile('mynewfile3.txt', 'Hello content!', function (err,file) {
//   if (err) throw err; 
//   console.log('Saved!');
// });
// var fs = require('fs');

// fs.appendFile('mynewfile1.txt', ' This is my text.', function (err) {
//   if (err) throw err;
//   console.log('Updated!');
// });
// var fs = require('fs');

// fs.unlink('myfirst.js', function (err) {
//   if (err) throw err;
//   console.log('Replaced!');
// });
// var fs = require('fs');

// fs.unlink('mynewfile3.txt', function (err) {
//   if (err) throw err;
//   console.log('File deleted!');
// });

// var url = require('url')
// var address = 'http://localhost:8080/default.html/?year=2022&month=feb';
// var q = url.parse(address,true)
// console.log(q.host)
// console.log(q.path)
// console.log(q.pathname)
// var data = q.query
// console.log(data.month)
// var http = require('http');
// var url = require('url');
// var fs = require('fs');
// http.createServer(function (req, res) {
//     var q = url.parse(req.url, true);
//     var filename = "." + q.pathname;
//     fs.readFile(filename, function(err, data) {
//       if (err) {
//         res.writeHead(404, {'Content-Type': 'text/html'});
//         return res.end("404 Not Found");
//       } 
//       res.writeHead(200, {'Content-Type': 'text/html'});
//       res.write(data);
//       return res.end();
//     });
//   }).listen(8080);

  


// var http = require('http');
// var uc = require('upper-case');
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.write(uc.upperCase("Hello World!"));
//   res.end();
// }).listen(8080);

// var fs = require('fs');
// var rs = fs.createReadStream('./mynewfile1.txt');
// rs.on('open', function () {
//   console.log('The file is open');
// })

// var http = require('http');
// var formidable = require('formidable');
// var fs = require('fs');

// http.createServer(function (req, res) {
//   if (req.url == '/fileupload') {
//     var form = new formidable.IncomingForm();
//     form.parse(req, function (err, fields, files) {
//       var oldpath = files.filetoupload.filepath;
//       var newpath = '/home/web/Desktop/javascripts' + files.filetoupload.originalFilename;
//       fs.rename(oldpath, newpath, function (err) {
//         if (err) throw err;
//         res.write('File uploaded and moved!');
//         res.end();
//       });
//  });
//   } else {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
//     res.write('<input type="file" name="filetoupload"><br>');
//     res.write('<input type="submit">');
//     res.write('</form>');
//     return res.end();
//   }
// }).listen(8080);

// var nodemailer = require('nodemailer');

// const dt = require('./myfirstmodule');


// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'bhanavaibhav23@gmail.com',
//     pass: 'dangerzone'
//   }
// });

// var mailOptions = {
//   from: 'bhanavaibhav23@gmail.com',
//   to: 'bhanavaibhav8@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });
// import * as a2 from './module2.mjs'


// console.log(a2.myDateTime())
// a2.default()

// const EventEmitter = require('events');
// class MyEmitter extends EventEmitter{}
// const myEmitter=new MyEmitter()
// myEmitter.on('waterFull',()=>{
//     console.log('please turn off the motar');
//     setTimeout(()=>{
//         console.log("please turn off the motar ! its gentel reminder")
//     },2000)
// })
// console.log("fdfdf")
// myEmitter.emit("waterFull");
// @########################## CRUD OPERATION USING BASIC NODE #############3

const http =require("http");
const { server } = require("live-server");
const rou = require('./routes.js')

// const server=http.createServer(rou);
// server.listen(8080);
http.createServer(function(req,res){
     console.log(rou.sometext)
     rou.handlers(req,res);


}).listen(8080)


// @##########################  EXPRESS WITH  NODE ##############$$$$$$$$
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
//      res.send('<form action="/lala" method="POST"><input type="text" name="message"> <button type="submit">send</button></form>');

// });
// // app.use('/lala',(req,res,next)=>{
// //      console.log(req.body)
// //      res.redirect("/add-product")
// // })
// app.listen(3001);






