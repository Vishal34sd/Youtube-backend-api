const express = require("express");


const router = express.Router();

router.post("/signup", userSignUp);



module.exports = router ;