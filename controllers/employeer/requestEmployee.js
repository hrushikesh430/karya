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
const JobPost = require('../../models/jobPost');
const JobPostPerEmployeer = require('../../models/jobPostPerEmployeer');

// Body-parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser());


exports.postJobInvitaion= tryCatch(async(req,res,next)=>{

    const employeeData = await Employee.findOneAndUpdate({_id:req.body.employeeId},{$push:{jobInvitation:req.body.postId}},{new:true});
   

    res.json({
        status:"successfully employee added to assigned List",
        employeeData
    })
    
})
