const express = require("express")
const app = new express()
const url = require("url")
const Student = require("./models/database").Student
const Course = require("./models/database").Course
const Batch = require("./models/database").Batch
const {Emailvalidation} = require("./models/auth")

app.use(express.json())


app.post("/student",Emailvalidation,async(req,res,next)=>{
    const data = req.body
    const batchid =req.body.batch
    const StudentData = new Student(data)
    // const sCountInBatch = await Batch.findOne({ _id:batchid });
    // console.log(sCountInBatch.students.length)
    // updateCource.updateOne({students:})
    await StudentData.save()
    res.send("data insert sucessfully")
   
})
app.get("/student/:id",async(req,res)=>{
    const _id = req.params.id
    // const userdata= await Student.findOne({_id}).populate("courses")
    const userdata= await Student.findOne({_id}).populate({
        path:"batch",
        // match:{batch: 1 }} ,
        populate:{
            path:"courses",
            // select:"name"
        }
    })
   console.log(userdata.batch);
   res.send(JSON.stringify(userdata))


})
app.get("/student",async(req,res)=>{
    var q = url.parse(req.url, true);
    const cname=q.query.Coursename
    const batch=q.query.batch
  
     const userdata= await Student.find().populate({
        path:"batch",
        select: { batch: batch},
        
    }).populate({
        path:"courses",
        select:"name",
        match:{name:{$in:cname}}
    })
    // console.log(userdata)
    const fil=userdata.filter(e=>{
        if(e.courses!==null){
            return e
        }
    })
    
    res.send(fil)
   
    // const userdata= await Student.find().populate({
    //     path:"batch",
    //     match: { batch: { $lte: 2 } },
    //     populate:{
    //         path:"courses",
    //         match:{name:"Banking"},
    //         // select:("name" === "Banking"),
    //         populate:{
    //             path:"students",
    //             select:"name"

    //         }
           
    //     }
    // });
    // res.send(userdata)
   
//    res.send(JSON.stringify(userdata))
//    const data =userdata.filter(e=>{
//        return e.batch.filter(f=>{
//            if(f.batch===1){
//                return f.courses.filter(g=>{
//                    if(g.name==='SSC'){
//                        return g
//                    }
//                })

//    }})})
//    console.log(data)

})
app.get("/course/:id",async(req,res)=>{
    const _id = req.params.id
    console.log(_id);
    const coursedata= await Course.findOne({_id}).populate("students")
   console.log(coursedata);
   res.send(JSON.stringify(coursedata))


})
app.get("/batch/:id",async(req,res)=>{
    const _id = req.params.id
    console.log(_id);
    const batchdata= await Batch.findOne({_id}).populate("courses")
   res.send(JSON.stringify(batchdata))


})
app.listen(8080,()=>{
    console.log("server is running on port 8080");
})


   