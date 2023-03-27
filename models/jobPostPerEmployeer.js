// const jobPost = require('./jobPost')
const mongoose = require("mongoose")

const jobPostPerEmployeer = new mongoose.Schema({
    employeerId:{
        type:String,
 
    },
    jobPostsId:[
        {
            type:String
        }
    ],

});
const JobPostPerEmployeer = mongoose.model("jobPostPerEmployeer",jobPostPerEmployeer); 
module.exports = JobPostPerEmployeer