const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },

    author:{
        type:String,
        required:true,
    },
    

    coverimage:{
        type:String,
        // required:true,
    },
})

//Through Model - Perform CRUD Operations
const blogmodel = mongoose.model("blog",blogSchema);

module.exports = blogmodel;