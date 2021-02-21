const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true
    },
    lastName:{
        type: String,
        required:true

    },
    phone:{
        type: Number,
        required:true

    },
    email:{
        type: String,
        required:true

    }
    
});

const User = mongoose.model("userData", userSchema)
module.exports = User