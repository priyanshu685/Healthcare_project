const asyncHandler = require("express-async-handler");
const bcsypt = require("byrypt");
const User = require("./models/userModel");
require("dotenv").config();


const requireUser = asyncHandler(async(req,res)=>{
    const{name, email, password, phoneno} = req.body;
    if(!name||!email||!password||!phoneno){
        res.status(400);
        throw new Error("Please provide all fields");
    }
    const userExists = await User.findOne({email});
    if(userExists){
        return res.status(400).json({message: "user already exist"});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        phoneNo,
        password: hashedPassword,
    });
    ReadableByteStreamController.status(201).json({message: "User registered successfully",user});
});
module.exports = {registerUser};