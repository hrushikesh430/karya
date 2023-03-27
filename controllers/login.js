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

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}
// Body-parser middleware
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

exports.postLogin = tryCatch(async(req,res,next)=>{
    const {email,password} = req.body;

    if(!email || !password)
    {
        throw AppError(300,"Invalid Username or Password",404);
    }
   
   
    let employee = await Employee.find({email,password});
    let employeer = await Employeer.find({email,password});
   
    if(!employee[0] && !employeer[0])
    {
       return res.json({
            status:"failed to login",
            reason:"user not found"
       })
    }
    if(employee[0])
    {
        
        // console.log(req.body.password);
        // console.log(employee[0].password);
        if(req.body.password != employee[0].password)
        {
            return res.json({
                status:"failed to login",
                reason:"passworrd incorret"
            })
        }
        const accessToken = jwt.sign({email,password},process.env.ACCESS_TOKEN);
        localStorage.setItem('status', 'employee');
        // console.log(employee[0].password);
        
        if(employee[0].loginTime == false)
        {
           
            await Employee.findOneAndUpdate({email},{$set:{loginTime:true}});
            
        }
       

        return res.cookie("access_token",accessToken).json({
            status:"Successful as employee",
            token:accessToken,
            data:employee
        })
    }
    if(employeer[0])
    {
        if(req.body.password != employeer[0].password)
        {
            return res.json({
                status:"failed to login",
                reason:"passworrd incorret"
            })
        }
        if(employeer[0].loginTime == false)
        {
            
            await Employeer.findOneAndUpdate({email},{loginTime:true});
        }
       
        const accessToken = jwt.sign({email,password},process.env.ACCESS_TOKEN);
        localStorage.setItem('status', 'employeer');
        console.log(localStorage.getItem('status'));
        return res.cookie("access_token",accessToken).json({
            status:"Successful as employee",
            token:accessToken,
            data:employeer
        })
    }

    return res.json({
        status:"failed to login",
        reason:"user not found"
    })
})

exports.getLogin = tryCatch(async(req,res,next)=>{
    
    
    return res.json({
        status:"success"
    })
})

