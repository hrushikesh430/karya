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


exports.postApplicantList= tryCatch(async(req,res,next)=>{

   
    const postData = await JobPost.find({_id:req.body.postId});
    const cnt = postData[0].applicationId.length;

    let data = [];

    for(let i =0 ; i < cnt ; i++)
    {
        let temp = await Employee.find({_id:postData[0].applicationId[i]});
        data.push(temp[0]);
    }
    

    res.json({
        status:"successfully employee added to assigned List",
        data
    })
    
})
