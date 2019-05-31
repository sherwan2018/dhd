var mongoose = require("mongoose");


var sportnewsSchema = new mongoose.Schema({


    Simage2: String,
    Sheadline2: String,
    Sdescription2: String,
    ScreatedAt:{type:Date , default:Date.now},

    Scomments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"SportComment"
       
        }
    ]

});



module.exports = mongoose.model("SportNews", sportnewsSchema);
