const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true
    },
    photo: {
        type: String
    },
    userName: {
        type: String,
        required: true
    },
    category: {
        type: Array
    },
},
    { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);