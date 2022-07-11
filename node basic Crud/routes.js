
const fs =require("fs");

const requesthandler= (req,res)=>{
    const url=req.url;
const method =req.method;
    if (url==="/"){
        res.writeHead(200,{'Content-Type': 'text/html'});
        res.write('<html>')
        res.write('<head> <title> my page</title></head>')
        res.write('<body> <form action="/message " method="POST"><input type="text" name="message"> <button type="submit">send</button></form></body>')
        res.write('</html>');
        return  res.end();
        }
        if(url==="/message" && method === "POST" ){
         const body =[];
         req.on('data',(chunks)=>{
              body.push(chunks)
         });
         return req.on('end',()=>{
              const parsebody = Buffer.concat(body).toString();
              const message= parsebody.split("=")[1];
              fs.appendFileSync("file.txt", message);
              res.statusCode=302;
              res.setHeader('Location', '/')
            
              return res.end()
         })
         
           
           
         } 
         res.setHeader("Content-type",'text/html');
         res.write('<html>');
         res.write('<head> <title> my page</title></head>');
         res.write('<body> <h1> my practice page </h1></body>');
         res.write('</html>')
         res.end();

}

module.exports.handlers=requesthandler;
module.exports.sometext="ddfasafadsfasdddddddddddd";
