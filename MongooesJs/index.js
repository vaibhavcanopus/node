const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/mongoosecrud",{useNewUrlParser:true},{useUnifiedTopology:true})
.then(()=> console.log("connection sucessful")).catch(err=> console.log(err))


const playlistSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    ctype:String,
    videos:{
        type: Number,
        valiidate(value){
            if(value<0){
                throw new Error(" videos count should not negative")
            }

        }
    },
    author:String,
    active:Boolean,
    date:{
        type:Date,
        default:Date.now
    }
})

//Collection creation
const Playlist = new mongoose.model("Playlist",playlistSchema);
const createDocument = async()=>{
    try{
        const expressPlaylist = new Playlist({
            name:"express js",
            ctype:"Back end",
            videos: 80,
            author:"vaibhav",
            active:false ,
        
        })
        const mongoPlaylist = new Playlist({
            name:"mongo ",
            ctype:"database",
            videos: 18,
            author:"vaibhav",
            active:false ,
        
        })
        const mongoosePlaylist = new Playlist({
            name:"Mongoose",
            ctype:"database",
            videos: 8,
            author:"vaibhav",
            active:false ,
        
        })
        const result = await Playlist.insertMany([mongoosePlaylist,mongoPlaylist,expressPlaylist]);
        console.log(result)
    }catch(err){
        console.log(err);
    }
    


}
//  createDocument();

const getDocument=async ()=>{
    const result = await Playlist
   
    
    
    
    // .find({ctype:{$in:["database",'front end']}})
    
    
    //Comparision query operatoor
    //.find({videos:{$lt:80}}), .find({videos:{$lte:80}})  .find({videos:{$gt:80}})  .find({videos:{$gte:80}})
    // .limit(1)
    // logical query operator 
    // .find({$and : [{ctype:'database'},{author:"vaibhav"}]})
    .find({$and : [{ctype:'database'},{author:"vaibhav"}]})
   
    // .select( {name:1})
    console.log(result)
     
}

// getDocument();



const updateDocument=async(_id)=>{
    try{
        const result= await Playlist.updateOne({_id} ,{$set:{ctype:"backend"}} 
    )
    console.log(result)
   

    }catch(err){
        console.log(err)

    }
    
    


}

// updateDocument("62889a1398d747ab05af6577")





const deleteDocument= async(_id)=>{
    try{
        const result = await Playlist.deleteOne({_id}) 
    }catch{
        err=> console.log(err)
    }
}


// deleteDocument("62889a1398d747ab05af6577");