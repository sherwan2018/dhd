var mongoose = require("mongoose");


var reklamSchema = new mongoose.Schema({


    image2: String,
    description2: String,

});



module.exports = mongoose.model("Reklam", reklamSchema);
