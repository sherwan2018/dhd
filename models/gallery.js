var mongoose = require("mongoose");


var gallerySchema = new mongoose.Schema({


    image4: String,
    description4: String,

});



module.exports = mongoose.model("Gallery", gallerySchema);
