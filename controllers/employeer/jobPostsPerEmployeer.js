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
const JobPostPerEmployeer = require('../../models/jobPostPerEmployeer')

// Body-parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser());

exports.getEmployeersPosts = tryCatch(async(req,res,next)=>{
   
    const data = await Employeer.find({email:req.employeer[0].email});
    const posts = await JobPostPerEmployeer.find({employeerId:data[0]._id.toString()});
    const cnt = posts[0].jobPostsId.length;
    // let postDataWorkName = [];
    // let postDataWorkAddress = [];
    // let postDataWorkDuration = [];
    // let postDataWorkTime = [];
    // let postDataWorkDescription = [];
    // let postDataWorkFrom = [];
    // let postDataPostTime = [];
    // let postDataEmployeerId = [];
    let postData=[];
    for(let i = 0 ; i < cnt ; i++)
    {
       let temppostData = (await JobPost.find({_id:posts[0].jobPostsId[i]}));
        // temppostData.toArray;
        
        postData.push(temppostData)
        
       console.log(postData)
    }
    return res.json({
        status:"success",
      data:postData
    })
})

// exports.getEmployeersPosts = tryCatch(async(req,res,next)=>{
   
  

//     const data = await Employeer.findOneAndUpdate({email:req.employee[0].email},{aboutMe:req.body.aboutMe}).then((data)=>{
//         console.log("employeer aboutme updated successfully")
//     })
//     return res.json({
//         status:"succesfully profile updated",
//         data:data[0].aboutMe
//     })

// })