const blogs = require('../Models/blogs');
   

const postblogs = async  (req,res)=>{
    const dbmessage = req.body
    blogs.create(dbmessage,(err,data) =>{
      if(err){
        res.send(err);
      }else {
       
        res.send(data);
      }
    })
 }


 const getblogs =async (req,res)=>{
    blogs.find({},(err,blogs)=>{
    if(err){
      res.send(err);
    }
    return res.status(200).json(blogs);
   }) ;  
}

 module.exports = {
    postblogs,
    getblogs
};