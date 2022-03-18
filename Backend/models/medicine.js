const mongoose = require("mongoose");
var User = require("./doctor");
const medicineSchema =new mongoose.Schema({

    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
    },

     medicinename:{
         type: String,
         unique: false
         
     },

     price :{
         type: Number
     },

     quantity: {
         type: Number
     },

     expdate:{
         type: String
     }
})

const product = mongoose.model('Medicine', medicineSchema);
module.exports = product;