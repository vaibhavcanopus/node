const Instagram = require('instagram-web-api')
const FileCookieStore = require('tough-cookie-filestore2')
require('dotenv').config()
const express = require("express")
const app = new express()
 
const { username, password } = process.env // Only required when no cookies are stored yet
const cookieStore = new FileCookieStore('./cookies.json')
// const client = new Instagram({ username, password })
console.log(username)


app.post("/imagepost/:str",async(req,res,next)=>{
    try{

    const img = req.params.str
    console.log(img)
    const client = new Instagram({ username: username, password: password }, { language: 'es-CL' })
    console.log("hyyyy");
    const photo = `./${img}`
    console.log("Logging in...");
    await client.login();
    console.log("Login successful!");
    console.log("hyyytrrrrrrrrrrrry");
    await client.uploadPhoto({ photo, caption: '❤️', post: 'feed' })
    // const { media } = await client.uploadPhoto({ photo: photo, caption: 'testing', post: 'feed' })
    console.log(`https://www.instagram.com/p/${media.code}/`)
    res.send("post successfully")

    }catch(err){
        console.log(err)    }

    

})


app.get("/imagepost",async(req,res,next)=>{
    try{
        await client.login()
        const profile = await client.getProfile()
        console.log("afdssssssssss",profile)
        res.send("fdf")

    }catch(err){
        console.log(err)
    }


})

app.listen(8080,()=>{
    console.log("port running")
})

