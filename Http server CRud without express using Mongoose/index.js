const http = require('http');
const logic = require("./controller/logic")

const url = require('url');
const Employee = require("./model/connection")

http.createServer(  function  (req, res) {
  // const urlparse = url.parse(req.url, true);
  const rurl =req.url
  const ids =rurl.slice(0,13)
  /// $######################$  GET @#$$$$$$$$$$$$$$$$$$$$$
  if(req.url  === '/employees' && req.method == 'GET'){
    try{
      const data =   logic.getEmployee().then(data=>{
        // obj = {name:"vaibhav"}
        // res.end(JSON.stringify(obj))
        res.end(JSON.stringify(data))
      })
   
   
    
    }catch(e)
    {
      res.end(e)


    }
     
  }
      /// $######################$  POST @#$$$$$$$$$$$$$$$$$$$$$
  if(req.url  === '/employees' && req.method == 'POST'){
    try{
      let data = '';
    req.on('data', chunk => {
      data += chunk;

    });
    req.on('end', () => {
      const emp= logic.CreateEmployee(JSON.parse(data)).then(data=>{
        res.end(JSON.stringify(data));
      })
     
    
    });

    }catch{
      res.end("data  not insert sucessfully");
    }
    
  }
  /// $######################$  DELETE @#$$$$$$$$$$$$$$$$$$$$$
  if(ids  === '/employees?id' && req.method == 'DELETE'){
    try{
      let id=rurl.split('/employees?id=')[1]
   if (id!==''){
    logic.deleteEmployee(id).then(data=>{
      res.end(JSON.stringify(data))
    })
  
  }
    else{
      res.end("please enter id")
    }
    }catch{
      res.end("Data no deleted ")
    }
  }

  /// $######################$  update @#$$$$$$$$$$$$$$$$$$$$$
  if(ids  === '/employees?id' && req.method == 'PATCH'){
    let id=rurl.split('/employees?id=')[1]
    if (id!==''){
    let data = '';
    req.on('data', chunk => {
      data += chunk;

    });
    req.on('end', () => {
      const emp= logic.updateEmployee(id,JSON.parse(data)).then(data=>{
        res.end(JSON.stringify(data));
      })
      
    
    });

    }else{
      
      res.end("please enter id")
    }


  }


}).listen(8000,()=>{
    console.log("server is running")
})