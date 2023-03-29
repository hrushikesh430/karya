require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3000 | process.env.PORT;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const tryCatch = require("../../utils/tryCatch");
const AppError = require("../../utils/AppError");
const jwt = require("jsonwebtoken")
const Employee = require('../../models/Employee');
const Employeer = require('../../models/Employeer');

// Body-parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser());

exports.getEmployeerProfile = tryCatch(async(req,res,next)=>{

    

    res.json({
        status:"successfullr profile sent",
        data:req.employeer[0]
    })
})

exports.postEmployeerProfile = tryCatch(async(req,res,next)=>{

    if(req.employeer[0] == undefined)
    {
        return next();
    }

    const data = await Employeer.findOneAndUpdate({email:req.employeer[0].email},{address:req.body.address,phone:req.body.phone,insta:req.body.insta,facebook:req.body.facebook},{new:true})
    return res.json({
        status:"succesfully profile updated",
        address:data.address,
        phone:data
    })
})
