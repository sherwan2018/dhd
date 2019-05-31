var express =require("express");
var router = express.Router();
var News = require("../models/news");
var Reklam= require("../models/reklam");
var Slider= require("../models/slider");
var SportSlider=require("../models/SportSlider");
var SportNews =require("../models/SportNews");
var User= require("../models/user.js");











//sport page
// saving the slider and the rekalms to db
router.get("/sport" , function(req ,res){

    SportSlider.find({}, function(err , Sslider){
      if(err){
        console.log(err);
      }else{
  
  
        Reklam.find({}, function(err, allreklam) {
          if (err) {
  
              console.log(err);
  
          }
          else {
  
            SportNews.find({} , function(err , sportnews){
  
               if(err){
                 console.log(err);
               }else{
  
  
                   res.render("sport" , {Sslider:Sslider , reklam:allreklam , sportNews:sportnews})
  
  
               }
  
            }).sort({ _id: -1 });;
  
  
  
  
  
  
  
  
        }
      }).sort({ _id: -1 });
      }
    }).sort({ _id: -1 }).limit(3);
  
  
  
  
  });
  
  
  
  
  
  
  
  
  
  
  
  //rendering form for the slider section in sport news
  router.get("/new-SportSlider" , function(req ,res){
  
    res.render("new-SportSlider");
  
  })
  
  router.post("/SportSlider" , function(req ,res){
  
  var Simage = req.body.Simage;
  var Sheadline = req.body.Sheadline;
  var Sdescription = req.body.Sdescription;
  var sportSlider ={Simage:Simage , Sheadline:Sheadline , Sdescription:Sdescription};
  
  
  SportSlider.create(sportSlider , function(err , Sslider){
  
     if(err){
       console.log(err);
     }else{
  
        res.redirect("/sport");
  
     }
  
  })
  
  
  });
  
  
  
  router.get("/new-SportNews" , function(req ,res){
  
    res.render("new-SportNews");
  })
  
  
  router.post("/SportNews" , function(req ,res){
  
    var Simage2=req.body.Simage2;
    var Sheadline2 =req.body.Sheadline2;
    var Sdescription2 =req.body.Sdescription2;
  
  var sportNews={Simage2:Simage2 ,Sheadline2:Sheadline2 ,Sdescription2:Sdescription2};
  
  SportNews.create(sportNews ,function(err ,sportNews){
  
  if(err){
  
    console.log(err);
  
  }else {
  
    res.redirect("/sport")
  
  }
  
  })
  
  
  })
  
  
  
  // creating show page for sport news
  
  
  router.get("/sport/:id" , function(req ,res){
  
    
    
    SportNews.findById(req.params.id).populate("Scomments").exec(function(err, foundnews) {
      if (err) {
          console.log(err);
   
      }
      else {
   
   
          res.render("sport-show", { sport : foundnews });
   
      }
   
   });
  
  
  
  
  });



  // Deleting  sport-slider routes

  router.delete("/sport/:sliderId" , function(req , res){

    SportSlider.findByIdAndRemove(req.params.sliderId , function(err){

        if(err){
          console.log(err);

        }else{

             res.redirect("/sport");

        }

       });




  });



  // Deleting sport post routes

  router.delete("/sport/:id" , function(req ,res){
      
     SportNews.findByIdAndRemove(req.params.id , function(err){
       if(err){
         console.log(err);
         
       }else{
        
        res.redirect("/sport");

       }
     })


  })



  

  
  // deleting sport reklam

 
  router.delete("/sport/:reklamId/reklam" , function(req ,res){
 
       Reklam.findByIdAndRemove(req.params.reklamId , function(err){

        if(err){
           
             console.log("err");
             
        }else{

            res.redirect("/sport");

        }

       })
   


  })
  
  


























module.exports=router;