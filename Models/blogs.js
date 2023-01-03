const mongoose = require("mongoose");

const blogsSchema =  mongoose.Schema({
    id : Number ,
    title : String ,
    subtitle: String,
    img : String ,
    description : String,
    published : String,
    name : String,
    

});


module.exports = mongoose.model('blogs',blogsSchema);

