require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3000 || process.env.PORT;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const tryCatch = require("../../utils/tryCatch");
const AppError = require("../../utils/AppError");
const jwt = require("jsonwebtoken")
const Employee = require('../../models/Employee');
const Employeer = require('../../models/Employeer');
const multer = require('multer');



// Body-parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser());

exports.postProfileImg = tryCatch(async(req,res,next)=>{

     console.log(req.file.path)
    
    
    const data = await Employeer.findOneAndUpdate({email:req.employeer[0].email},{profileImg:req.file.path},{new:true})
    return res.json({
        status:"succesfully profile photo uploaded",
   
    })
})

exports.getProfileImg = tryCatch(async(req,res,next)=>{
    const data = await Employeer.find({email:req.employeer[0].email});
    res.json({
        status:"successfully profile photo sent",
        url:data[0].profileImg

    })
})