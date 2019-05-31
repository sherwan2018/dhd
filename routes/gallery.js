var express =require("express");
var router = express.Router();
var Gallery= require("../models/gallery");







// Gallery


router.get("/gallery" , function(req ,res){


    Gallery.find({} , function(err ,allgallery){
      if(err){
        console.log(err);
      }else{
         res.render("gallery" , {gallery:allgallery});
  
      }
    }).sort({ _id: -1 });
  
  
  
  });
  
  
  
  
  
  
  
  //redring a from to post new img to the gallery
  router.get("/gallery/new" , function(req ,res){
  
  res.render("new-gallery");
  
  });
  
  
  
  
  router.post("/gallery" , function(req ,res){
  
  var image4=req.body.image4;
  var description4 = req.body.description4;
  
  
  var gallery = {image4:image4 , description4:description4};
  
  
  Gallery.create(gallery , function(err,galery){
    if(err){
      console.log(err);
    }else{
  
      res.redirect("/gallery");
    }
  })
  
  
  
  
  })
  

















module.exports=router;