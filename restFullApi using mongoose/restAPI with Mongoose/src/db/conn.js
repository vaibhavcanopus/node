const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/Olympic")
.then(()=>{console.log("database connect")}).catch(err => console.log("no connection"))


