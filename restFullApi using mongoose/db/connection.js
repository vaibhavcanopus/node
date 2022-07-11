const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/student-api",{
 
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("database connected")

}).catch(err=> console.log(err));

