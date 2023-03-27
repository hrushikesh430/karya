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
const JobPost = require('../../models/jobPost')
const Application = require('../../models/applications');
// Body-parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser());


exports.postApply = tryCatch(async(req,res,next)=>{
   
   

    const postId = req.body.postId;
    // const employeerId = req.body.employeerId;
    const data = await Employee.find({email:req.employee[0].email});
    const updatedData = await JobPost.findOneAndUpdate({_id:postId},{$push:{applicationId:data[0]._id}},{new:true});
    // const applicationData = new Application({postId:postId,employeeId:data[0]._id,employeerId:employeerId});
    // applicationData.save();

    return res.json({
        status:"succesfully applicant added",
        // updatedData
    })

})