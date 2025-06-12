import mongoose from "mongoose";
import express from "express";
import User from "../model/user.js";
import Video from "../model/video.js";
import cloudinary from "../config/cloudinary.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/upload",checkAuth,async(req, res)=>{
    try{
        const {title , description, category ,tags }= req.body; 
        if(!req.files || req.files.video || req.files.thumbnail){
            res.status(400).json({
                error : "Video and thumbnail are required"
            });
        }
        const videoUpload = await cloudinary.uploader.upload(req.files.video.tempFilePath,{
            resource_type : "video",
            folder:"videos"
        });

         const thumbnailUpload = await cloudinary.uploader.upload(req.files.thumbnail.tempFilePath,{
        
            folder:"thumbnails"
        });

        const newVideo = new Video({
            _id : req.user._id,
            videoUrl : videoUpload.secure_url,
            videoId : videoUpload.publicId ,
            thumbnailUrl : thumbnailUpload.secure_url,
            thumbnailId : thumbnailUpload.public_id,
            category ,
            tags : tags ? tag.split(","): []
        });
        await newVideo.save();
        res.status(200).json({
            message : "Video Uploaded successfully ", video : newVideo
        });
    }
        catch(e){
       console.error("Something went wrong due to ", e);
        res.status(500).json({ error: "Internal server error" });
    } 
});

router.put("/update/:id", checkAuth , )









export default router ;