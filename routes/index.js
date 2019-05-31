var express =require("express");
var router = express.Router();
var passport=require("passport");
var News = require("../models/news");
var Reklam= require("../models/reklam");
var User= require("../models/user.js");
var Slider= require("../models/slider");


//index
router.get("/" , function(req ,res){


    // finding the news and loop thro it
    News.find({}, function(err, allnews) {
      if (err) {
  
          console.log(err);
  
      }else {
  
  
    // finding the reklams and loop thro it
          Reklam.find({}, function(err, allreklam) {
            if (err) {
  
                console.log(err);
  
            }
            else {
                //passing the the found news & reklams to the index.ejs to post it
  
  
  
  
                Slider.find({}, function(err, allslider) {
                  if (err) {
  
                      console.log(err);
  
                  }
                  else {
                      //passing the the found news & reklams to the index.ejs to post it
  
                      res.render("index", {news: allnews , reklam: allreklam , slider:allslider });
  
                  }
  
                }).sort({ _id: -1 }).limit(3);
  
  
  
  
  
  
  
            }
  
        }).sort({ _id: -1 });
  
  
  
  
  
  
  
  
  
      }
  
  }).sort({ _id: -1 })
  
  
  });
  
  
  // show more for news posts
  
  router.get("/news/:id" , function(req ,res){
  
  
  
    News.findById(req.params.id).populate("comments").exec(function(err, foundnews) {
     if (err) {
         console.log(err);
  
     }
     else {
  
  
         res.render("news-show", { news : foundnews });
  
     }
  
  });
  
  
  
  
  
  
  
  
  });



  

//rendering a form for posting hot & breaking news to hte main section(slider)

router.get("/slider/new" , function(req ,res){

    res.render("new-slider");
  })
  
  
  //save the slider posts to db
  router.post("/slider" , function(req ,res){
  
    var image3 = req.body.image3;
    var headline2= req.body.headline2;
    var description3=req.body.description3;
  
    var slider ={image3:image3 , headline2:headline2 , description3:description3};
  
  
    Slider.create(slider, function(err, newSlide) {
        if (err) {
  
            console.log(err);
        }
        else {
  
            //redirect to the index page
            res.redirect("/");
        }
  
  
  
  
  
  });
  
  
  
  
  });






  

//rendering a form for posting a new news
router.get("/new/new" , function(req,res){

    res.render("new-news");
  
  });
  
  
  
  //reciving the new new from the form and save it to db
  
  router.post("/news" , function(req ,res){
  
    // GET DATA FROM THE FORM AND SAVE TO THE DB
    var image = req.body.image;
    var headline = req.body.headline;
    var description = req.body.description;
  
  
    var news = {image:image , headline:headline , description:description };
  
    //CREATE A NEW NEWS AND SAVE TO DB
    News.create(news, function(err, newNews) {
        if (err) {
  
            console.log(err);
        }
        else {
  
            //redirect to the index page
            res.redirect("/");
        }
  
  
  
  
  
  });
  });









  
//reklam section
// getting form for posting reklam
router.get("/reklam/new" , function(req ,res){
    res.render("new-reklam");
  });
  
  
  
  router.post("/reklam" , function(req ,res){
  
  
    var image2 = req.body.image2;
    var description2 = req.body.description2;
  
    var reklam ={ image2:image2 , description2:description2}
  
    //CREATE A NEW REKLAM AND SAVE TO DB
    Reklam.create(reklam, function(err, newReklam) {
        if (err) {
  
            console.log(err);
        }
        else {
  
            //redirect to the index page
  
            res.redirect("/");
        }
  
  
  
  });
  
  });




  //deleting news-slider


  router.delete("/news/:sliderId" , function(req ,res){

      Slider.findByIdAndRemove(req.params.sliderId , function(err){

        if(err){
          console.log(err)
        }else{

          res.redirect("/");
        }

     

      })
      


  })



  // deleting news posts



router.delete("/fool/:newsId" , function(req ,res){

  News.findByIdAndRemove(req.params.newsId, function(err){
    if(err){
        console.log("PROBLEM!");
    } else {
     
        res.redirect("/");
    }
  });

});




// deleting news reklam

router.delete("/news/:reklamId/reklam" , function(req , res){
  Reklam.findByIdAndRemove(req.params.reklamId , function(err){

    if(err){

      console.log(err);
    }else{


      res.redirect("/");
    }



  });
 

});























// ===========================

  // Auth routes

//   ============================


//show register form

router.get("/register" , function(req ,res){


    res.render("register");
  
  
  })
  
  
  // getting the user info
  
  router.post("/register" , function(req ,res){
    var newUser =new User({username:req.body.username});
    if(req.body.adminCode === 'mamjader1998'){

      newUser.isAdmin=true;
    }
    User.register(newUser , req.body.password,function(err ,user){
  
  
      if(err){
        console.log(err);
        return res.render("register");
  
  
  
      }
  
      passport.authenticate("local")(req ,res,function(){
  
        res.redirect("/");
  
      });
  
  
  
  
  
      
  
    })
  
  
  
  })
  
  
  
  
  // show the login form
  
  router.get("/login" , function(req ,res){
  
      
    res.render("login");
      
  
  })
  
  //authenticating the login info
  router.post("/login" ,passport.authenticate("local" ,
   {
     successRedirect:"/", 
     failureRedirect:"/login"
    
    }), function(req ,res){
  
  res.send("hi");
  
  })
  
  
  //logOut route
  
  router.get("/logout" , function(req ,res){
  
  
    req.logout();
  
    res.redirect("/");
  
  
  
  });
  
  
  











  module.exports=router;
  