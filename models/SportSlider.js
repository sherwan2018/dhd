var mongoose = require("mongoose");


var sportsliderSchema = new mongoose.Schema({


    Simage: String,
    Sheadline: String,
    Sdescription: String,

});



module.exports = mongoose.model("SportSlider", sportsliderSchema);
