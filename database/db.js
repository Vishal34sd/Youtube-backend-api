import mongoose from "mongoose";

const connectToDB = async ()=>{
    try{
        const connectDB = await mongoose.connect("mongodb+srv://dubeyji8080:dubey123@cluster0.uai8kho.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Database connected successfully");
    }
    catch(e){
        console.error("Database do not connected due to",e);
    }
}

export default connectToDB ;