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
const applicantList = require('../controllers/employeer/applicantList');
const removerEmployee = require('../controllers/employeer/removeEmployeeFromAssignedList');
const assignedList = require('../controllers/employeer/assignedList');
const requestEmployee = require('../controllers/employeer/requestEmployee');
const profileImg = require('../controllers/employeer/employeerProfileImg');
const personalInfo = require('../controllers/employeer/personalInfo')
const finishJob = require('../controllers/employeer/finish')
const cookieParser = require("cookie-parser");
const multer  = require('multer')
const { storage } = require('../cloudinary/index'); 
const upload = multer({ storage });

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

// list the info of applicant 
router.post('/applicantList',autheticationToken,applicantList.postApplicantList)

// list the info of assigned employees
router.post('/assignedList',autheticationToken,assignedList.postAssignedList);

// request for job to employee
router.post('/requestEmployee',autheticationToken,requestEmployee.postJobInvitaion);

// upload profile image
router.get('/uploadProfileImg',autheticationToken,profileImg.getProfileImg);
router.post('/uploadProfileImg',autheticationToken,upload.single('image'),profileImg.postProfileImg);


// remove employee from the assigned list
router.post('/removeEmployee',autheticationToken,removerEmployee.postRemoveEmployee);

// personal info
router.get('/personalInfo',autheticationToken,personalInfo.getEmployeerInfo);

// finish job Post
router.post('/finishJob',autheticationToken,finishJob.postFinishJobPost);


module.exports = router;   
