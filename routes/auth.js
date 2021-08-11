const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();



router.post("/register", async (req, res) => {
    try {   
        if (req.body.password !== req.body.confirmPassword){
            return res.status(400).send("Passwords do not match")
        }

        const existingEmail = await User.findOne({email: req.body.email});
        if (existingEmail) {
            return res.status(400).send("Email already in the database");
        }
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        const user = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            confirmPassword: hashedPassword
        });
        user.save();
        res.send(user);
    } catch (err) {
        return res.status(500).send(err)
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = {
            email: req.body.email,
            password: req.body.password
        }
        if (!(user.email && user.password)){
            return res.status(400).send("All input fields are required")
        }

        const userCheck = await User.findOne({email: user.email})
        if (!userCheck) {
            return res.status(400).send("Invalid email")
        }

        const matchPassword = await bcrypt.compare(user.password, userCheck.password);
        if (!matchPassword){
            return res.status(400).send("Invalid Password")
        }
        
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "30m"});

        // console.log(token)
        return res.status(200).send(`success: ${userCheck._id}, ${token}`)



    } catch (err) {
        return res.status(500).send(err)
    }
})



module.exports = router;