// first we are initializing jsonwebtoken module to use functionalities of jwt, e.g.: sign, verify.
const jwt = require("jsonwebtoken");
// After successful Register of user, and then calling the login endpoint with the already registered user, 
// It will create and return jwt token.
const createToken = (userData)=>{
    return jwt.sign(userData,process.env.PRIVATE_KEY,{expiresIn:400000})
}
// After login, we are getting the token, and for validation  the jwt token , that it is correct or not, 
// we will proceed with sercure routes, to get/post/update/delete.

const validateJwtToken=(req,res,next)=>{
    // we are checking that token is available or not in Request header.
    const authCheck = req.headers.authorization;
    // Option1: req header tokrn, authorization not sent.(Doesn't exists)
    if(!tokenCheck) return res.status(401).json({err:"TOKEN NOT AVAILABLE"});
    // Option 2req header token is received but not in a right format
    // Authorization: basic/bearer
    // Basic btoa(USERNAME:PASSWORD)->basic hfdiuhdshfds[BASE64]
    //  BEARER fdihusshiufdshisdoisadsa
    const token=req.header.authorization.split(' ')[1];

    if(!token){
        return res.status(401).json({err:"Invalid Token"})
    }

    try{
        const validateToken=jwt.verify(token,process.env.PRIVATE_KEY);
        req.user=validateToken;
        next();
    }catch(err){
        return res.status(401).json({err,message});    
    }
}

module.exports = {generateJwtToken,validateJwtToken};