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
const Finish = require('../../models/history')
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

exports.postFinishJobPost = tryCatch(async(req,res,next)=>{
   
  

    const data = await JobPost.find({_id:req.body.postId});
    await JobPost.findOneAndDelete({_id:req.body.postId});
    const finishData = new Finish({workName:data[0].workName,workAddress:data[0].workAddress,workDuration:data[0].workDuration,workTime:data[0].workTime,workFrom:data[0].workFrom,location:{type:"Point",coordinates:[data[0].location.coordinates[0],data[0].location.coordinates[1]]},employeerId:data[0].employeerId,postTime:data[0].postTime,workDescription:data[0].workDescription,employeerName:data[0].employeerName})
    finishData.applicationId = data[0].applicationId;
    finishData.assignedId = data[0].assignedId;
    finishData.save();
    return res.json({
        status:"succesfully finished job posted",
       
        data:finishData
    })

})