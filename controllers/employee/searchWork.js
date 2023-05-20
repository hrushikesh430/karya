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



exports.postSearchWork = tryCatch(async(req,res,next)=>{
   
    const text = req.body.workName;
    
    const works = await JobPost.find({});

    let data = [];

    for(let i = 0 ; i < works.length ; i++)
    {
        let str = works[i].workName.toLowerCase();
        let sub_str = text.toLowerCase();
        if(str.includes(sub_str))
        {
            data.push(works[i]);
        }
    }
    
    return res.json({
        status:"work succesfully fetched",
        data
    
    })
})