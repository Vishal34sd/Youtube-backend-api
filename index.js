const express = require("express");
const connectToDB = require("./database/db");
require("dotenv").config()

const PORT = process.env.PORT || 8000 ;
connectToDB()




const app = express();

app.listen(PORT , ()=>{
    console.log(`Server is running on ${PORT}`);
})