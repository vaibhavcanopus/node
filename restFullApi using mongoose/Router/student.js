const express= require("express");
const Router = new express.Router();
const Student = require('../models/students')


Router.get("/students" ,async(req,res,next)=>{
    try{
        const getAllData = await Student.find()
        res.send(getAllData)

    }catch(e){

        res.send(e)
    }



})

/// from promises we can post the data
// app.post("/students" ,(req,res,next)=>{
//     console.log(req.body)
//     const user  = new Student(req.body);
//     user.save().then(()=>{
//         res.status(201).send(user)
//     }).catch( (err) => res.status(400).send(err))
//     })


/// from aysnc and await we can post the data
Router.post("/students", async(req,res)=>{
try{
    const user  = new Student(req.body);
    const Createuser = await user.save()
    res.status(201).send(Createuser); 
}catch(e){
    res.status(400).send(e);
}    
})

Router.get("/students/:id",async(req,res)=>{
try{
    const id = req.params.id
    const studentData = await Student.findById({_id:id})
    res.send(studentData)
}catch(e){
    res.send(e)
}

})

Router.patch("/students/:id",async(req,res)=>{
try{
    const id = req.params.id
    const data = await Student.findByIdAndUpdate({_id:id},req.body,{new:true})
    res.send(data)
}catch(e){
    res.status(400).send(e)
}
})

Router.delete("/students/:str",async(req,res)=>{
try{
const str = req.params.str
console.log("dafsss",str)
const deleteData =  await Student.deleteOne({name:str(str)})

}catch(e){
res.status(400).send(e)

}
})

module.exports=Router;