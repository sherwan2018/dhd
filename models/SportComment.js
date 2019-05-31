var mongoose = require("mongoose");

var SportCommentSchema = new mongoose.Schema({

    text:String,
    ScreatedAt:{type:Date , default:Date.now},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }

})





module.exports = mongoose.model("SportComment", SportCommentSchema );