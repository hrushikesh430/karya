
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
// const employeerProfile = require('../controllers/employeerProfile');
const employeeAboutMe = require('../controllers/employee/employeeAboutMe');
// const employeerAboutMe = require('../controllers/employeerAboutMe');
const employeeSkills = require('../controllers/employee/employeeSkills');
// const employeeProfileImg = require('../controllers/employee/employeeProfileImg');
const multer = require("multer");
const apply = require('../controllers/employee/apply');
// const {getStorage,ref,getDownloadURL,uploadBytesResumable} = require("firebase/storage");
// const profileFirebase = require('../../models/profileFirebase');
// const storage = getStorage();

const upload = multer({storage:multer.memoryStorage()});
const cookieParser = require("cookie-parser");
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
// router.post('/uploadProfileImg',upload.single('filename'),employeeProfileImg.postProfileImg);

router.get('/sample',autheticationToken,sample.getSample);

module.exports = router;   