const express = require('express');
const app = new express();
const db= require('./db/connection')
const Student = require('./models/students')
const studentRouter = require("./Router/student")
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(studentRouter)

   
app.listen(port,()=>{
    console.log(`connection is setup in ${port}`)
});