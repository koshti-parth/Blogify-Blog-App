const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    content:{
        type:String,
        required:true,
    },

    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"blog",
    },
})

//Through Model - Perform CRUD Operations
const commentmodel = mongoose.model("comment",commentSchema);

module.exports = commentmodel;