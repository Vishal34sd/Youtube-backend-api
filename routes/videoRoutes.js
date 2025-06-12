import mongoose from "monggose";
import express from "express";
import User from "../model/user.js";
import Video from "../model/video.js";
import cloudinary from "../config/cloudinary.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/upload",checkAuth, )









export default router ;