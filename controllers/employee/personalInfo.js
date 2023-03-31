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

// Body-parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser());

exports.getEmployeeInfo = tryCatch(async(req,res,next)=>{

    
    const data= await Employee.find({email:req.employee[0].email});
    const jobData = await JobPost.find({});
    const cnt = jobData.length;
    const assignedData  = [];
    for(let i = 0 ; i < cnt ; i++)
    {
        if(jobData[i].assignedId.includes(data[0]._id))
        {
            assignedData.push(jobData[i]);
        }
    }

        return res.json({
        status:"successfully personal infor sent",
        data:data[0],
        assignedJobs:assignedData
    })
})


