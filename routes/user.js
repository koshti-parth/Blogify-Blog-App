const express = require("express");
const usermodel = require("../models/user");
const blogmodel = require("../models/blog");
const multer  = require('multer')
const {createBlog,logout,showBlog,postComment} = require("../controllers/user");

const userrouter = express.Router();
//start Route : /loguser


//Home Route : Display All Blogs on Explore Page
userrouter.get("/",async (req,res)=>{
  let user = await usermodel.findOne({email:req.user.email});
  let blogs = await blogmodel.find({});
  return res.render("explore.ejs",{user,blogs})
})


userrouter.get("/dashboard",async (req,res)=>{
    let user = await usermodel.findOne({email:req.user.email});
    let blogs = await blogmodel.find({author:req.user.email});
    return res.render("userDashboard.ejs",{user,blogs})
});


//Blog form
userrouter.get("/blogform",(req,res)=>{
    return res.render("blogform.ejs")
})



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

//For Creating Blog
userrouter.post("/create",upload.single('coverimage'),createBlog)


//For Logout
userrouter.get("/logout",logout);

//For Showing Blog
userrouter.get("/blog/:id",showBlog)


//For Doing comment
userrouter.post("/comment/:id",postComment)










module.exports = userrouter; 