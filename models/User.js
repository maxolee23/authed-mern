const mongoose = require("mongoose");
// const {Schema} = mongoose;

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        max: 20 
    },
    lastName: {
        type: String, 
        required: true,
        max: 20
    },
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
    }
})

module.exports = mongoose.model("User", userSchema);