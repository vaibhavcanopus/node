fs = require("fs");
const { json } = require("express/lib/response");
const path = require('path')
const Cart =require('./cart')
// const products=[]
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
    constructor(id,title,imageUrl,price,desc){
        this.id=id;
        this.title=title;
        this.imgUrl=imageUrl;
        this.price=price;
        this.desc=desc;
       
    }
    save(){
        getProductFromFile(products=>{
            if(this.id){
            const existingProductIndex=products.findIndex(prod=> prod.id === this.id);
            const updatedProducts=[...products]
            updatedProducts[existingProductIndex]=this;
            fs.writeFile(p,JSON.stringify(updatedProducts),(err)=>{
                console.log(err);
            });
            }else{
                this.id = Math.random().toString()
                products.push(this);
            fs.writeFile(p,JSON.stringify(products),(err)=>{
                console.log(err);
            })
            }
        // products.push(this);
        // storing in file
       
        // const p = path.join(path.dirname(process.mainModule.filename),
        // 'data',
        // 'products.json ');
        // fs.readFile(p,(err,fileContent)=>{
        //     let products=[];
        //     if (!err){
        //         products= JSON.parse(fileContent)
        //     }
            
            
        });

    }
    static deleteById(id){
        getProductFromFile(products=>{
            console.log("productd",products)
            const product =products.find(prod=> prod.id === id);
            const updatedProducts =products.filter(p=> p.id !== id);
            fs.writeFile(p,JSON.stringify(updatedProducts),(err)=>{
                if(!err){
                    Cart.deleteProduct(id, product.price);

                };
            });
        })
    }

    

    static fetchAll(cb){
       
        getProductFromFile(cb)
        // return products;
    }
    static findById(id,cb){
        getProductFromFile(products=>{
            const product =products.find(p=> p.id === id);
            cb(product);

        });
    }
}