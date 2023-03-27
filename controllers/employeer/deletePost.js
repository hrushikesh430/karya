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


exports.postDeletePost= tryCatch(async(req,res,next)=>{

    const data= await Employeer.find({email:req.employeer[0].email});
    const postData = await JobPost.deleteOne({_id:req.body.postId}).then((data)=>{
        console.log("post deleted successfully from JobPost");
    }).catch((err)=>{
        console.log("error in deleting JobPost "+err);
    })
    const EmployeerData = await JobPostPerEmployeer.findOneAndUpdate({employeerId:data[0]._id},{$pull:{jobPostsId:req.body.postId}},{new:true});

    res.json({
        status:"successfullt post deleted",
        EmployeerData
    })
    
})
