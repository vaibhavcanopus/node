const mongoose = require("mongoose")
const Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost:27017/populate",(err,result)=>{
    if(!err){
        console.log("database connected")
    }
})

const UserSchema = new Schema({

    name: String,
    email: String,
    batch:{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch"
   },
    startDate:{
       type:Date,
       default:Date.now()

    },
    courses: { 
       type: mongoose.Schema.Types.ObjectId,
       ref: "course"
    }
 });
 
 const CourseSchema = new Schema({
    name: String,
    price:Number,
    duration:String,
    description: String,
    students: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: "student"
   }]
 })
 const Batchschema = new Schema({
   batch:Number,
   courses: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: "course"
   }],
   students: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: "student"
   }]



 })

 UserSchema.post("save",async function(next){
   const id = this._id
   const courseid =this.courses
   const batchId = this.batch
   const updateCource = await Course.findOne({ _id:courseid });
   let list = []
   list.push(id)
   updateCource.students.forEach(element => {
      list.push(element)
   });
   updateCource.updateOne({students:list},(err, success) => {
      if(!err){
         console.log("updated")
      }else{
         console.log(`errror in post Signals ${err}  `)
      }
   })
   const updateBatch = await Batch.findOne({ _id:batchId });
   let list1=[]
   list1.push(courseid)
   let  list2=[]
   list2.push(id)
   updateBatch.students.forEach(element => {
      list2.push(element)
   });
   updateBatch.courses.forEach(element => {
      list1.push(element)
   });
   updateBatch.updateOne({$set:{ students:list2,courses:list1}},(err, success) => {
      if(!err){
         console.log("updated Batch")
      }else{
         console.log(`errror in post Signals ${err}  `)
      }
   })

   
     
   
   
 })

 const Student = mongoose.model("student", UserSchema);
 const Course = mongoose.model("course", CourseSchema);
 const Batch = mongoose.model("Batch",Batchschema)

 
 module.exports = {Student,Course,Batch}