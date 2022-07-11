const express = require("express")
const app = new express();
const axios = require("axios")
CircularJSON = require('circular-json')

// GET https://graph.instagram.com/{api-version}/{user-id}
//   ?fields={fields}
//   &access_token={access-token}
let url = `https://graph.facebook.com/v14.0/17841453442916518?fields=id,biography,media_count,followers_count,follows_count,profile_picture_url,username,website,name,media&access_token=EAAKFcWEZAJRcBACcddRSF79GAmWt7x6Vz4Dve5WIh7dxeVZBfIQZAyemTgEmJS779ZAB8DaloxbPb96ZAXLigJntlOquANgMzAsWjq7tmAX62mpSGeT7944UIfaWUL55kIzVW98ZA8rOr2hXkr5VOfwdvZB0oujmg10xZAozodIaHofuCfveK1JGH92n2qF1WubZAa15RKng1jYZCiG6buFw0s`

app.get("/url",async(req,res)=>{
    try{
    console.log("dfdf");
    const data  = await axios.get(url)
    console.log(data)
    res.json(data.data)
   
    // res.send(JSON.stringify(data))
    }catch(err){
        console.log(err)
        res.send(err)
    }
   
})


app.post("/url",async(req,res)=>{
    try{ 
        // const photo = `./${image.jpg}`
        const photo = 'https://media.istockphoto.com/photos/rainforest-and-sunbeam-at-morning-picture-id1012436578?s=612x612'
        console.log(photo)
        url =` https://graph.facebook.com/v14.0//101514885925767/photos?url=${photo}&access_token=EAAYN8HFuCMoBAPQXljUW8rnYvmvVhfJZABT5SdQJbrsECZCcjn8PSPZBK16hkTaUMfyCJotjXWllkZA3fcZBxz2jYYflWY5dYX8YhVfZAggDlIsJwEVZCRruMmwGbA2TkAz9mMphZAx07RxSkfe96fMPDPYdqsBCZCtuZCW8XkuEtlzcDHdZCHGlGkVaPzQGdNbTViuOdhWjttZAEZBBlMwfqfCcF`
        const data  = await axios.post(url)
        res.json("data post")
   
    // res.send(JSON.stringify(data))
    }catch(err){
        console.log(err)
        res.send(err)
    }
   
})
app.listen(8080,()=>{
console.log("")
})



// 17841453442916518/media?image_url=https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_960_720.jpg&caption=%23BronzFonz

// 17841453442916518/media_publish?creation_id=17925376418467903

// 17925376418467903



    