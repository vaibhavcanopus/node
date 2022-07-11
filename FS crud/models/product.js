const fs =require("fs");
const path = require("path");
const p = path.join(path.dirname(process.mainModule.filename),
'data',
'products.json ');
const getProductFromFile = cb =>{
        fs.readFile(p,(err,fileContent)=>{
            if (err){
                cb([])  ;
            } 
            cb (JSON.parse(fileContent));
        })
    
    };



module.exports= class Product{
    constructor(id,title,imageUrl,price,description){
        this.title=title;
        this.id= id
        this.imageUrl=imageUrl;
        this.price=price
        this.description=description;
    }
    save() {
        getProductFromFile(products => {
          if (this.id) {
            const existingProductIndex = products.findIndex(
              prod => prod.id === this.id
            );
            const updatedProducts = [...products];
            updatedProducts[existingProductIndex] = this;
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
              console.log(err);
            });
          } else {
            this.id = Math.random().toString();
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
              console.log(err);
            });
          }
        });
      }
    

    static fetchAll(cb){
        getProductFromFile(cb)
    }
    
    
    static FindById(id,cb){
        getProductFromFile(products=>{
            const product = products.find(p=>p.id === id)
            cb(product)
        })

    }

    static delete(id){
      getProductFromFile(products=>{
      const product = products.filter(p=>p.id !== id)
      fs.writeFile(p, JSON.stringify(product), err => {
        console.log(err);
      });
     
    })

      
    }
}
