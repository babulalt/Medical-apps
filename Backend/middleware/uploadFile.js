const { Router } = require("express");
const multer=require("multer");
const router = require("../routes/doctor");








const upload = multer({
    storage:Storage
   

});



module.exports=upload;