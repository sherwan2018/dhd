var express =require("express");
var router = express.Router();
var News = require("../models/news");
var SportNews =require("../models/SportNews");
var Comment = require("../models/comment");
var SportComment = require("../models/SportComment");
var User= require("../models/user.js");


















// ===================================

// Comments Routes

// ==============================



//news comment

router.get("/news/:id/comments/new" , isLoggedIn,function(req ,res){

  
    News.findById(req.params.id ,function(err, foundnews) {
      if (err) {
          console.log(err);
   
      }
      else {
   
   
          res.render("new-comment", { news : foundnews });
   
      }
    })
  
  
  })
  
  
  router.post("/news/:id/comments",isLoggedIn, function(req ,res){
  
  
     
    News.findById(req.params.id ,function(err, foundnews) {
      if (err) {
          console.log(err);
          res.redirect("/");
   
      }
      else {
        Comment.create(req.body.comment , function(err,comment){
          if(err){
  
            console.log(err);
  
          }else{
  
            


            comment.author.id = req.user._id;
            comment.author.username = req.user.username;
            //save comment
            comment.save();
            foundnews.comments.push(comment);
            foundnews.save();
           
            res.redirect("/news/" + foundnews._id);
            
  
  
  
          }
        })
   
   
          
   
      }
    })
  
  
  
  
  
  
  
  })
  
  
  
  // Sportnews comments routes
  
  
  
  router.get("/sport/:id/comments/new" , isLoggedIn,function(req ,res){
  
    
    SportNews.findById(req.params.id ,function(err, foundnews) {
      if (err) {
          console.log(err);
   
      }
      else {
   
   
          res.render("newsport-comment", { sportnews : foundnews });
   
      }
    })
  
  
  })
  
  
  
  
  // post sportnews comment route
  
  
  router.post("/sport/:id/comments",isLoggedIn, function(req ,res){
  
  
     
    SportNews.findById(req.params.id ,function(err, foundnews) {
      if (err) {
          console.log(err);
          res.redirect("/");
   
      }
      else {
        SportComment.create(req.body.comment , function(err,comment){
          if(err){
  
            console.log(err);
  
          }else{
   
            comment.author.id = req.user._id;
            comment.author.username = req.user.username;
            //save comment
            comment.save();
            foundnews.Scomments.push(comment);
            foundnews.save();
           
            res.redirect("/sport/" + foundnews._id);
  
  
  
          }
        })
   
   
          
   
      }
    });
  
  
  
  
  
  
  
  })


  // deleting comments routes



    
router.delete("/news/:newsId/comments/:commentId",isLoggedIn, function(req, res){
  Comment.findByIdAndRemove(req.params.commentId, function(err){
      if(err){
          console.log("PROBLEM!");
      } else {
          res.redirect("/news/" + req.params.newsId);
      }
  })
});



  
router.delete("/sport/:id/comments/:commentId",isLoggedIn, function(req, res){
  SportComment.findByIdAndRemove(req.params.commentId, function(err){
      if(err){
          console.log("PROBLEM!");
      } else {
          res.redirect("/sport/" + req.params.id);
      }
  })
});







  
// middlware

function isLoggedIn(req ,res ,next){


    if(req.isAuthenticated()){
  
      return next();
    }
  
  
  res.redirect("/login");
  
  
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
module.exports=router;  