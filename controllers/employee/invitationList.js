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

// Body-parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser());

exports.getInvitationList = tryCatch(async(req,res,next)=>{
  
    const data = await Employee.find({email:req.employee[0].email});

    const len = data[0].jobInvitation.length;

    let invitationData = [];

    for(let i = 0 ; i < len ; i++)
    {
        let temp = await JobPost.find({_id:data[0].jobInvitation[i]});
        invitationData.push(temp[0]);
    }

    return res.json({
        status:"success",
        data:invitationData
    })
})

