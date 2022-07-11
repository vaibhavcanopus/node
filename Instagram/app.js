const {IgApiClient}=require('instagram-private-api')
require('dotenv').config()
const {readFile}=require('fs')
const {promisify} = require("util")
const console = require('console')
const readFileAsync = promisify(readFile)
const express = require("express")
const app = new express()

const {username,password} = process.env
const ig = new IgApiClient()

app.post("/imagepost/:str",async(req,res,next)=>{
    // const img = req.params.str
 try{
            const img = req.params.str
            ig.state.generateDevice(username)
            await ig.simulate.preLoginFlow()
            const user = await  ig.account.login(username,password)
           
             const path =`./${img}`
            const published = await ig.publish.story({
                file:await readFileAsync(path),
                caption:" strugle of life",

                
    
            })
            console.log(published)
            res.send("post successfully")
    
        }catch(err){
    
            console.log(err)
        }
     
})
// const postimg= async()=>{
//     try{
//         ig.state.generateDevice(username)
//         await ig.simulate.preLoginFlow()
//         const user = await  ig.account.login(username,password)
//         const path = './image.jpg'
//         const published = await ig.publish.photo({
//             file:await readFileAsync(path),
//             caption:" strugle of life"

//         })
//         console.log(published)

//     }catch(err){

//         console.log(err)
//     }
// }


app.listen(8080,()=>{
    console.log("port running")
})