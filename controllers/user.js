const usermodel = require("../models/user");
const blogmodel = require("../models/blog");
const commentmodel = require("../models/comment");
const {makeToken} = require("../authService/auth.js")

async function signup(req, res) {
    let body = req.body;

    try {
        let user = await usermodel.create({
            name: body.name,
            email: body.email,
            password: body.password,
        })
    }
    catch (err) {
        res.redirect("/sign")
    }
    return res.redirect("/sign")
}

async function login(req, res) {
    let body = req.body;
    let user = await usermodel.findOne({
        email: body.email,
        password: body.password,
    })
    if (!user) {
        return res.redirect("/login");
    }
    
    //Make Token
    let token = makeToken(user);

    //Set As Cookie
    res.cookie("Token",token);

    return res.redirect("/loguser/dashboard");
}




//Create A Blog
async function createBlog(req,res){
    let body = req.body;

    let blog = await blogmodel.create({
        title:body.title,
        content:body.content,
        author:req.user.email,
        coverimage:`/uploads/${req.file.filename}`,

        //Note in coverimage : i am just storing string  because if i store actual image 
        //the load on server will increase.This is the best Practise.
    })

    return res.redirect("/loguser/blogform")

}


async function logout(req,res){
    res.clearCookie("Token");
    return res.redirect("/")
}

//Shwoing Individual  Blog Page
async function showBlog(req,res){
    let id = req.params.id;
    let user = await usermodel.findOne({email:req.user.email});
    let blog = await blogmodel.findOne({_id:id});
    let comments = await commentmodel.find({
        blog:id,
    });
    return res.render("blog.ejs",{blog,user,comments});
}

async function postComment(req,res){
    let body = req.body;
    let id = req.params.id
    let comment = await commentmodel.create({
        user:req.user.id,
        content:body.content,
        blog:id,
    })
    return res.redirect(`/loguser/blog/${id}`);
}





module.exports = {
    signup, login,createBlog,logout,showBlog,postComment
}