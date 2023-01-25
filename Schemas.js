const mongoose = require("mongoose")

const PostSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    address:{
        type: String,
        require: true ,
        
    },
    imgFile: {
        type: String ,
        require: true 
    },
    description: {
        type: String ,
        require: true 
    }
})




module.exports = {Post:mongoose.model("InstaPost", PostSchema) }