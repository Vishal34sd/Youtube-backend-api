// import bcrypt from "bcrypt";
// import User from "../model/user";
// import mongoose from "mongoose";
// import cloudinary from "cloudinary";

// const userSignUp = async (req, res) => {
//     try {
//         const hashedPassword = await bcrypt.hash(req.body.password, 10);
//         const uploadImage = await cloudinary.uploader.upload(
//             req.files.logo.tempFilePath
//         );
//         const newUser = new User({
//             _id: new mongoose.Types.ObjectId(),
//             email: req.body.email,
//             password: hashedPassword,
//             channelName: req.body.channelName,
//             phone: req.body.phone,
//             logoUrl: uploadImage.secure_url,
//             logoId: uploadImage.public_id
//         });
//         const user = await newUser.save();

//         res.status(201).json({
//             user
//         });
//     } catch (e) {
//         console.error("Something went wrong due to ", e);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };

// module.exports = {userSignUp} ;