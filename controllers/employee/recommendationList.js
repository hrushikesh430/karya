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

function similar_text(first, second, percent) {
  
  
    if (first === null || second === null || typeof first === 'undefined' || typeof second === 'undefined') {
      return 0;
    }
  
    first += '';
    second += '';
  
    var pos1 = 0,
      pos2 = 0,
      max = 0,
      firstLength = first.length,
      secondLength = second.length,
      p, q, l, sum;
  
    max = 0;
  
    for (p = 0; p < firstLength; p++) {
      for (q = 0; q < secondLength; q++) {
        for (l = 0;
          (p + l < firstLength) && (q + l < secondLength) && (first.charAt(p + l) === second.charAt(q + l)); l++)
        ;
        if (l > max) {
          max = l;
          pos1 = p;
          pos2 = q;
        }
      }
    }
  
    sum = max;
  
    if (sum) {
      if (pos1 && pos2) {
        sum += similar_text(first.substr(0, pos1), second.substr(0, pos2));
      }
  
      if ((pos1 + max < firstLength) && (pos2 + max < secondLength)) {
        sum += similar_text(first.substr(pos1 + max, firstLength - pos1 - max), second.substr(pos2 + max,
          secondLength - pos2 - max));
      }
    }
  
    if (!percent) {
      return sum;
    } else {
      return (sum * 200) / (firstLength + secondLength);
    }
  }
  function longest_common_starting_substring(arr1){
    let arr= arr1.concat().sort();
    let a1= arr[0];
    let a2= arr[arr.length-1];
    a1 = String(a1);
    a2 = String(a2);
    let L= a1.length;
    let i= 0;
    while(i< L && a1.charAt(i)=== a2.charAt(i)) i++;
    return a1.substring(0, i);
  }
exports.getRecommendationList = tryCatch(async(req,res,next)=>{
  
  const jobPost = await JobPost.find({});
    const data = await Employee.find({email:req.employee[0].email});
    const skillsLength = data[0].skills.length;
    
    const cnt = jobPost.length;
    let recommendationData = [];
  //  (similar_text(data[0].skills[i].toLowerCase(),jobPost[j].workName.toLowerCase() > 3))
    for(let i = 0 ; i < skillsLength ; i++)
    {
        for(let j = 0 ; j < cnt ; j++)
        {
            if((longest_common_starting_substring([data[0].skills[i].toLowerCase(),jobPost[j].workName.toLowerCase()]).length > 3) )
            {
                
                recommendationData.push(jobPost[j]);
               
            }
        }
    }
    return res.json({
        status:"successfully sent recommendation Data",   
        recommendationData
    })
})

