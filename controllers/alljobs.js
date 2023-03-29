require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3000 | process.env.PORT;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const tryCatch = require("../utils/tryCatch");
const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken")
const Employee = require('../models/Employee');
const Employeer = require('../models/Employeer');
const JobPost=require('../models/jobPost')

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}
// Body-parser middleware
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

exports.postAllJobs = tryCatch(async(req,res,next)=>{
    // const data = await Employeer.find({email:req.employeer[0].email})
    const {latitude,longitude} = req.body;
    const employerpost =await JobPost.find({location:{ $near: {$geometry:{coordinates:[latitude,longitude],type:"Point"}}}});
    const cnt = employerpost.length;
    let employersData =[];
    res.json({
        status:"successfull all jobs data sent",
        cnt,
        jobPosts:employerpost
    })
})