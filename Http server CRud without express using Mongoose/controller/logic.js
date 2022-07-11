const Employee = require("../model/connection")
const CreateEmployee= async(data)=>{
    try{
        const user  = new Employee(data);
        const Createuser = await user.save()
        return Createuser   
    }catch(e){
      console.log("sdfaaaa",e)
    }    
    }
  
const getEmployee =async()=>{
   
        try{
            const getAllData = await Employee.find()
           return getAllData
            
           
    
        }catch(e){
           return e
        }
    }
const deleteEmployee = async(id)=>{
    try{
    const deleteData =  await Employee.deleteOne({_id:id})
     return deleteData
    
    }catch(e){
        return e
    
    }
    }
const updateEmployee= async(id,datas)=>{
    try{
        // console.log("idididid",id)
        // console.log("data",datas)
        const data = await Employee.findByIdAndUpdate({_id:id},datas,{new:true})
         return data
    }catch(e){
        return e
    }
    }

exports.CreateEmployee=CreateEmployee
exports.getEmployee=getEmployee
exports.deleteEmployee= deleteEmployee
exports.updateEmployee=updateEmployee