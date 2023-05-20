
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
const autheticationToken = require('../middleware/authentication')
const sample = require('../controllers/sample');
const employeeProfile = require('../controllers/employee/employeeProfile');
const invitationList = require('../controllers/employee/invitationList')
const employeeAboutMe = require('../controllers/employee/employeeAboutMe');
const recommendationList = require('../controllers/employee/recommendationList')
const employeeSkills = require('../controllers/employee/employeeSkills');
const employeeProfileImg = require('../controllers/employee/employeeProfileImg')
const personalInfo = require('../controllers/employee/personalInfo')
const allEmployeeInfo = require('../controllers/employee/allEmployeeInfo')
const apply = require('../controllers/employee/apply');
const removeSkills = require('../controllers/employee/removeSkills')
const employeeInfo = require('../controllers/employee/employeeInfo')
const searchWork = require('../controllers/employee/searchWork')
const multer  = require('multer')
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });
const cookieParser = require("cookie-parser");
const { authenticate } = require("passport");
// Body-parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser);

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET' 
  }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/landing"
  },
  async function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));

passport.serializeUser(function(user, cb) {
    cb(null, user);
   
  });
  
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });





// ----------- Controller -----------


// profile Update for employee
router.get('/profileUpdate',autheticationToken,employeeProfile.getEmployeeProfile)
router.post('/profileUpdate',autheticationToken,employeeProfile.postEmployeeProfile);




// About Me for employee
router.get('/updateAboutMe',autheticationToken,employeeAboutMe.getEmployeeAboutMe);
router.post('/updateAboutMe', autheticationToken,employeeAboutMe.postEmployeeAboutMe);




// skills for employee
router.get('/updateSkills',autheticationToken,employeeSkills.getEmployeeSkills);
router.post('/updateSkills',autheticationToken,employeeSkills.postEmployeeSkills);

// apply for job
router.post('/apply',autheticationToken,apply.postApply)

// profile image upload
router.get('/uploadProfileImg',autheticationToken,employeeProfileImg.getProfileImg);
router.post('/uploadProfileImg',autheticationToken,upload.single('image'),employeeProfileImg.postProfileImg);

// list of invitaions
router.get('/invitaionList',autheticationToken,invitationList.getInvitationList);

// recommendation List
router.get('/recommendationList',autheticationToken,recommendationList.getRecommendationList)


// personal Info
router.get('/personalInfo',autheticationToken,personalInfo.getEmployeeInfo);

// all employee info
router.get('/allEmployeeInfo',autheticationToken,allEmployeeInfo.getAllEmployeeInfo);

// remove skills 
router.post('/removeSkills',autheticationToken,removeSkills.postRemoveEmployeeSkills);

// info on particularemployee
router.post('/employeeInfo',autheticationToken,employeeInfo.postEmployeeInfo)

router.get('/sample',autheticationToken,sample.getSample);

// search work
router.post('/searchWork',autheticationToken,searchWork.postSearchWork);

module.exports = router;   