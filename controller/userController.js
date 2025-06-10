import bcrypt from "bcyrpt" ;
import User from "../model/user";


const userSignUp = async(req , res)=>{
    try{ 
        const hashedPassword = await bcrypt.hash(req.body.password , 10);
        const uplaodImage = await cloudinary.uploader.upload(
            req.files.logo.tempFilePath
        )
        const newUser = new User({
            _id : new mongoose.Types.ObjectId,
            email:req.body.email ,
            password : hashedPassword,
            channelName : req.body.channelName,
            phone : req.body.phone ,
            logoUrl : uploadImage.secure_url,
            logoId : uploadImage.public_Id
            
        });
        const user = await newUser.save();

        res.status(201).json({
            user
        })
    }
    catch(e){
        console.error("Something went wrong due to ", e);
    }
}