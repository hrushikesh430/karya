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

// Body-parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser());

exports.getRegister = tryCatch(async(req,res,next)=>{
    
    res.json({
        status:"Success"
    })
 });
 

 exports.postRegister = tryCatch(async(req,res,next)=>{
    console.log(req.body)
   const {name,email,password,phone,Type} = req.body;
   
    if(!name || !email || !phone || !password){
        
        throw new AppError(300,"input field not provided",404)

    }
    const employee = await Employee.find({email:email});
    const employeer = await Employeer.find({email:email});
    if(employee[0])
    {
        return res.json({
            status:"failed to register",
            reason:"employee already exits with this email"
        })
    }
    if(employeer[0])
    {
        return res.json({
            status:"failed to register",
            reason:"employee already exits with this email"
        })
    }
    if(Type == 2)
    {
        const employer = new Employeer({name,email,password,phone});
        employer.save();
        return res.json({
            status:"Successfully registered as employeer",
            data:employer 
        });
    }
    if(Type == 1)
    {
        const employee = new Employee({name,email,password,phone});
         employee.save();
        return res.json({
            status:"Successfully registered as employee",
            data:employee 
        });
    }
    

    
    res.json({
        status:"failed to register",
        
    });
})
