const express = require("express");


const router = express.Router();

router.post("/signup", userSignup);



module.exports = router ;