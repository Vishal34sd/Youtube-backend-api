import express from "express" ;
import connectToDB from "./database/db.js" ;
import dotenv from "dotenv" ;
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";

import userRoutes from "./routes/userRoutes.js";
const PORT = process.env.PORT || 8000 ;
dotenv.config();
connectToDB()




const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use(fileUpload({
    useTempFiles : true ,
    tempFileDir : "./tmp/"
}))


app.use("/api/v1/user",userRoutes);


app.listen(PORT , ()=>{
    console.log(`Server is running on ${PORT}`);
})