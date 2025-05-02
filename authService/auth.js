const jwt = require("jsonwebtoken");
const secretKey = "Parth9824329496";


function makeToken(user){

    return jwt.sign({
        id:user._id,
        email:user.email,
    },secretKey);
}

function verifyToken(token){

    let user = jwt.verify(token,secretKey);
    if(!user){
        return null;
    }
    return user;
}

module.exports = { makeToken ,verifyToken};