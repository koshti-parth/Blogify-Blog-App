const {verifyToken} = require("../authService/auth.js")

function authenticate(req,res,next){
    const token = req.cookies?.Token;
    if(!token){
        return res.redirect("/login");
    }

    let user = verifyToken(token);
    if(!user){
        return res.redirect("/login");
    }
    req.user = user;
    next();
}

module.exports = {authenticate};