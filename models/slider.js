var mongoose = require("mongoose");


var sliderSchema = new mongoose.Schema({


    image3: String,
    headline2: String,
    description3: String,

});



module.exports = mongoose.model("Slider", sliderSchema);
