const mongoose = require("mongoose");
var User = require("./doctor");
var SCHEMA = mongoose.Schema;
const appointmentSchema = new mongoose.Schema({

    userid: {
        type: SCHEMA.Types.ObjectId,
        ref: User,
    },

    name: {
        required: 'Name required',
        type: String,
    },

    speciality: {
        required: 'Required',
        type: String
    },

    purpose: {
        type: String,
        required: 'purpose required',

    },

    phone: {
        required: 'phone number required',
        type: String
    },

    doctor: {
        required: ' is required',
        type: String
    },

    date: {
        required: 'required',
        type: String
    },

   status: {
            type: String,
            enum: ['Confirm','Cancel','Pending'],
            default: 'Pending',
            
        }
    })

const appointment = mongoose.model('appointment', appointmentSchema);
module.exports = appointment;