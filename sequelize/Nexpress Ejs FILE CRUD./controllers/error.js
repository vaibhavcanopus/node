exports.Error404=(req,res,next)=>{

    res.status(404).render('404',{doctitle:"Page Not Found",path:'/404'})
    

  
}