const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const ejs = require("ejs");
const path = require("path");
const app = express();
const PORT = 8001;

const {signup,login} = require("./controllers/user")
const {authenticate} = require("./middlewares/auth");


//Mongodb Connection

mongoose.connect("mongodb://localhost:27017/Blogify")
.then((Val)=>{console.log("Database Connected.")})
.catch((err)=>{console.log("Error ",err)});


// Middleware : To Parse Form Body 
app.use(express.urlencoded({extended:false}));

//Middleware - To serve Static Files
app.use(express.static(path.join(__dirname,'public')))

//Middleware - To Read Cookie From Request
app.use(cookieParser()); //Global Use

//Custom Middleware
// app.use(authenticate); //Global Use

//Set Template Engine
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));


//Routers
const router = require("./routes/entryroute");
const userrouter = require("./routes/user");

//Entry Routes 

app.use("/",router);
app.use("/loguser",authenticate,userrouter);


app.post("/user/signup",signup)
app.post("/user/login",login)


//I made Seprate route so any user can see blogs but will not able to do comments.
const blogmodel = require("./models/blog");
app.get("/blog/:id",async (req,res)=>{
    let id = req.params.id;
    let blog = await blogmodel.findOne({_id:id});
    return res.render("blog.ejs",{blog});
})

app.listen(PORT,()=>{
    console.log(`Server Running on PORT: ${PORT}. http://localhost:8001/`)
})