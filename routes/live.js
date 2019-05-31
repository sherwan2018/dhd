var express=require("express");
var router = express.Router();






//live
router.get("/live" , function(req ,res){

    res.render("live");
    
    });
    
    





module.exports=router;