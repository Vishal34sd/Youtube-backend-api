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
//No video wiull change only its meta data will change 
router.put("/update/:id", checkAuth , async(req , res )=>{
    try{
        const {title , description , category , tags } = req.body;
        const videoId = req.params.id ;
        // find video by id 
        const video = await Video.findById(videoId);
        if(!video){
            res.status(400).json({
                message : "Video not found "
            });
        }
        if(video.user_id.toString()!==req.user._id.toString()){
            res.status(403).json({
                message : "Unauthorized Access"
            });
        }
        if(req.files && req.files.thumbnail){
            await cloudinary.uploader.destroy(video.thumbnailId);

            const thumbnailUpload = await cloudinary.uploader.upload(req.files.thumbnail.tempFilePath,{
                folder: "thumbnail"
            });
        video.thumbnailUrl = thumbnailUpload.secure_url;
        video.thumbnailId = thumbnailUpload.public_id;
        }
        video.title = title || video.title;
        video.description = description || video.description;
        video.category = category || video.category;
        video.tags = tag? tags.split(","): video.tags;

        await video.save();
        res.status(200).json({
            message : "Video updated successfully", video
        });
    }
    catch(e){
         console.error("Something went wrong due to ", e);
        res.status(500).json({ error: "Internal server error" });
    }
} )









export default router ;