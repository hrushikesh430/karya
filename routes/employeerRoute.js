const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const passport = require('passport');
const session = require('express-session')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = '1023260677636-rilkrn4ohrqidp221jt1vce73crp2fup.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
const Employee = require('../models/Employee');
const Employeer = require('../models/Employeer');
const jobPostsPerEmployeer = require('../controllers/employeer/jobPostsPerEmployeer')
const autheticationToken = require('../middleware/authentication')
const acceptEmployee = require('../controllers/employeer/acceptEmployee');
const deletePost = require('../controllers/employeer/deletePost');
const employeerProfile = require('../controllers/employeer/employeerProfile');
const employeerAboutMe = require('../controllers/employeer/employeerAboutMe');
const jobPostForm = require('../controllers/employeer/jobPostForm');
const singlePost = require('../controllers/employeer/singlePost');
const cookieParser = require("cookie-parser");


// Body-parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser);


// profile update for employeer
router.get('/profileUpdate',autheticationToken,employeerProfile.getEmployeerProfile)
router.post('/profileUpdate',autheticationToken,employeerProfile.postEmployeerProfile);


// About me for employeer
router.get('/updateAboutMe',autheticationToken,employeerAboutMe.getEmployeerAboutMe);
router.post('/updateAboutMe', autheticationToken,employeerAboutMe.postEmployeerAboutMe);


// job post form
router.get('/jobPostForm',autheticationToken,jobPostForm.getJobPostForm);
router.post('/jobPostForm',autheticationToken,jobPostForm.postJobPostForm);


// job posts per employeer
router.get('/jobPostsPerEmployeer',autheticationToken,jobPostsPerEmployeer.getEmployeersPosts);


// delete the job post
router.post('/deletePost',autheticationToken,deletePost.postDeletePost);

// accept employee
router.post('/acceptEmployee',autheticationToken,acceptEmployee.postAcceptEmployee);

// single post data
router.post('/singlePost',autheticationToken,singlePost.postSinglePost);
module.exports = router;   
