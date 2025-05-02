const express = require("express");
const blogmodel = require("../models/blog");
const router = express.Router();

router.get("/",async (req,res)=>{
    let blogs = await blogmodel.find({});
    return res.render("home.ejs",{blogs})
});


router.get("/login",(req,res)=>{
    return res.render("login.ejs")
});


router.get("/blog",(req,res)=>{
    return res.render("blog.ejs")
})


router.get("/sign",(req,res)=>{
    return res.render("sign.ejs")
});

module.exports = router; 