const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name:{
            type: String,
            require:[true,"Please add your name"],
        },
        email:{
            type:Array,
            require:[true,"Please add your email id"],
        },
        password:{
            type:Array,
            require:[true,"Please add your password"],
        },
        phoneno:{
            type:Array,
            require:[true,"Please add your phoneno"],
        }
    },
    {
        timestamps:true,
    }
);