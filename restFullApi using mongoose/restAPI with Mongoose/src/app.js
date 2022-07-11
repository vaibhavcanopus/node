const express = require("express");
const router = new express.Router
const app = new express();
const path = require("path")
require("./db/conn")
const Race = require("./models/race")
// const static_path = path.join(__dirname,"../public")
// app.use(express.static(static_path));
app.use(express.json())

// console.log(static_path)
router.get("/",(req,res)=>{
    res.send("hello") 
})
router.post("/mens",async(req,res)=>{
    try{

        console.log("dsaff",req.body)
        const createData = await new Race(req.body)
        createData.save()
        res.status(201).send(createData)
    }catch(e){
        res.status(400).send(e)
    }

})

app.get("/mens",async(req,res)=>{
    try{
        const fetchAllData = await Race.find().sort({"ranking":1})  
        console.log(fetchAllData)
        res.send(fetchAllData)
    }catch(e){
        res.send(e)
    }

})
app.patch("/mens/:id",async(req,res)=>{
    try{
        const id =req.params.id
        const data = req.body
        console.log(id)
        const FindbyId = await Race.findByIdAndUpdate({_id:id},data,{new:true})   
        console.log(FindbyId)
        res.status(201).send(FindbyId)
    }catch(e){
        res.status(400).send(e)
    }

})
app.delete("/mens/:id",async(req,res)=>{
    try{
        const id = req.params.id
        const deleteData = await Race.deleteOne({_id:id})
        res.send(deleteData)
    }catch(e){
        res.send(e)
    }
})
app.listen(3000,()=>{
    console.log("connection done.")
})