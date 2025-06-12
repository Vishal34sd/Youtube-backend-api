import express from "express" ;
const router = express.Router();
import bcrypt from "bcrypt";
import cloudinary from "../config/cloudinary.js";
import User from "../model/user.js"
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

router.post("/signup", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const uploadImage = await cloudinary.uploader.upload(
            req.files.logoUrl.tempFilePath
        );
        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hashedPassword,
            channelName: req.body.channelName,
            phone: req.body.phone,
            logoUrl: uploadImage.secure_url,
            logoId: uploadImage.public_id
        });
        const user = await newUser.save();

        res.status(201).json({
            user
        });
    } catch (e) {
        console.error("Something went wrong due to ", e);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/login", async (req, res) => {
    try {
       const existingUser = await User.findOne({email: req.body.email});
       if(!existingUser){
        res.status(404).json({
            message : "User not found"
        });
       }
       const isValid = await bcrypt.compare(
        req.body.password, existingUser.password
       );
       if(!isValid){
        res.satus(500).json({
            message : "Invalid Credientials"
        })
       }
       const token = jwt.sign({
        _id : existingUser._id,
        channelName : existingUser.channelName,
        email : existingUser.email,
        phone : existingUser.phone,
        logoId : existingUser.logoId
       }, process.env.JWT_TOKEN , {expiresIn : "1h"})
       res.status(200).json({
         _id : existingUser._id,
        channelName : existingUser.channelName,
        email : existingUser.email,
        phone : existingUser.phone,
        logoId : existingUser.logoId,
        token : token,
        subscribers : existingUser.subscribers,
        subscribedChannel : existingUser.subscribedChannels
       })
    } catch (e) {
        console.error("Something went wrong due to ", e);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router ;