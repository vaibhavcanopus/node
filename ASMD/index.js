const express = require('express')
const add = require("./src/asmd").add
const multiply = require("./src/asmd").multiply
const subtract = require("./src/asmd").subtract
const divide = require("./src/asmd").divide
const app = new express()



const multi = (req,res,next) =>{
  console.log("addtion", req)
    req.multiply= multiply(5,4)
    return {message : "Hello"}
 }

 const addtion = (req,res,next)=>{
   console.log("addtion", req)
   res.add = 8
    next();
 }

 const subii = (req,res,next)=>{
  console.log("subtraction", req)
  res.subtract = 5

   
  next();
}
const divides = (req,res,next)=>{
  console.log("divide", req)
  res.divide = 3
  req.divi=divide(15,3);
  next();
}


app.get("/arthmaticOperations" , addtion, subii , divides , multi)

app.get("/",multi,addtion,divides,subii,(req,res)=>{
   
    res.send(`addtion is ${req.sum}  multipication is ${req.multiply}, sutraction is ${req.sub}  divide is ${req.divi}`)
  
  })
  app.get("/mul-div",multi,divides,(req,res)=>{
   
    res.send(`  multipication is ${req.multiply},   divide is ${req.divi}`)
  
  })
  app.get("/add",addtion,(req,res)=>{
   
    res.send(` addtion is ${req.sum}`)
  
  })
  app.get("/sub",subii,(req,res)=>{
   
    res.send(` subtraction  is ${req.sub}`)
  
  })


app.listen(3002
  ,()=>{
    console.log("connected")

})

