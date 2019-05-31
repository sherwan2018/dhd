var mongoose = require("mongoose");


var newsSchema = new mongoose.Schema({


    image: String,
    headline: String,
    description: String,
    createdAt:{type:Date , default:Date.now},
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
            
        }
    ]


});



module.exports = mongoose.model("News", newsSchema);
