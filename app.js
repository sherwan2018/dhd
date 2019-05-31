var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport=require("passport");
var LocalStrategy = require("passport-local");
var session = require("express-session");
var User = require("./models/user");
var News = require("./models/news");
var Reklam= require("./models/reklam");
var Slider= require("./models/slider");
var Gallery= require("./models/gallery");
var SportSlider=require("./models/SportSlider");
var SportNews =require("./models/SportNews");
var Comment = require("./models/comment");
var SportComment = require("./models/SportComment");
var indexRoutes = require("./routes/index");
var sportRoutes = require("./routes/sport");
var commentsRoutes =require("./routes/commentsRoutes");
var galleryRoutes=require("./routes/gallery")
var liveRoutes =require("./routes/live");
var aboutRoutes = require("./routes/about");
methodOverride = require("method-override");









// DB conection
mongoose.connect("mongodb://localhost/dhd-online" , { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);



app.locals.moment = require('moment');



// set the view to ejs template
app.set("view engine" , "ejs");


//serving extelnal files such as stylesheet 
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: true}));










// passport config

app.use(require("express-session")({
  secret:"mamjader",
  resave:false,
  saveUninitialized:false

}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// current-user


app.use(function(req ,res, next){

  res.locals.currentUser=req.user;
  next();
});







// using the routes
app.use(indexRoutes);
app.use(sportRoutes);
app.use(commentsRoutes);
app.use(galleryRoutes);
app.use(liveRoutes);
app.use(aboutRoutes);






app.listen(3000 , function(){
  console.log("server has started on 3000");
  
})
