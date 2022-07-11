const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;
let _db;

const mongoConnect=callback=>{
MongoClient.connect(
  'mongodb+srv://vaibhav:1234@cluster0.fzm7w.mongodb.net/?retryWrites=true&w=majority'
  )
  
.then(client=>{console.log("connected")
_db=client.db;
callback()
})
.catch(err=> {console.log(err); throw err})
};


const getDb=()=>{
  if(_db){
    console.log('done')
    return _db;
   

  };
  console.log('donewqewe')
  throw 'No database Connected'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
