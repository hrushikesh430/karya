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
const JobPost = require("../../models/jobPost")
const JobPostPerEmployeer = require('../../models/jobPostPerEmployeer');
// Body-parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser());

exports.getJobPostForm = tryCatch(async(req,res,next)=>{
   
    return res.json({
        status:"success",
        data:req.employeer[0]
    })
})

exports.postJobPostForm = tryCatch(async(req,res,next)=>{
   
  

    const data = await Employeer.find({email:req.employeer[0].email})
    const {workName,workAddress,workDuration,workTime,workFrom,latitude,longitude,postTime,workDescription} = req.body;
    const lat = parseFloat(latitude);
    const long = parseFloat(longitude);
    const jobPost = new JobPost({workName,workAddress,workDuration,workTime,workFrom,location:{type:"Point",coordinates:[long,lat]},employeerId:data[0]._id,postTime,workDescription,employeerName:data[0].name});
    jobPost.save();


    // jobPostPerEmployeer insertion
    const jobPostPerEmployeer = await JobPostPerEmployeer.find({employeerId:data[0]._id});
    if(jobPostPerEmployeer[0])
    {
        await JobPostPerEmployeer.findOneAndUpdate({employeerId:data[0]._id.toString()},{$push:{jobPostsId:jobPost._id}})
        console.log(jobPostPerEmployeer[0].jobPostsId)
    }
    else
    {
        const employeerPostData = new JobPostPerEmployeer({employeerId:data[0]._id.toString(),jobPostsId:[jobPost._id]});
        employeerPostData.save();
        console.log("saved")
    }
    return res.json({
        status:"succesfully jobForm posted",
        workId:jobPost._id,
        data:jobPost
    })

})