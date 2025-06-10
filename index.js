const express = require("express");
const connectToDB = require("./database/db");
require("dotenv").config()
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";

const PORT = process.env.PORT || 8000 ;
connectToDB()




const app = express();
app.use("/api/v1/user",userRoutes);
app.use(bodyParser.json());

app.use(fileUpload({
    useTempFiles : true ,
    tempFileDir : "./tmp/"
}))

app.listen(PORT , ()=>{
    console.log(`Server is running on ${PORT}`);
})