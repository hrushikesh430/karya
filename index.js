require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3000 || process.env.PORT;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const employeeRoute = require("./routes/employeeRoute");
const employeerRoute = require('./routes/employeerRoute');
const routes = require('./routes/route');
const errorHandler = require('./middleware/errorHandler')
const passport = require('passport');
const session = require('express-session')
const cors = require('cors');

app.use(cors());



app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET' 
  }));

app.use(passport.initialize());
app.use(passport.session());




// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(__dirname + "/public"));

app.get('/',(req,res)=>{
    res.send("Hello World");
})




// db 
mongoose.set('strictQuery', true);
mongoose.connect(process.env.URI, () => {
    console.log("Db connected");
  });

app.listen(PORT , (req,res)=>{
    console.log(`the app is listning in port ${PORT}`);
})

//middleware
app.use(errorHandler);
app.use(routes);
app.use('/employee',employeeRoute);
app.use('/employeer',employeerRoute);
