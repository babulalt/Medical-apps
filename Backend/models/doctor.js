const mongoose = require('mongoose')
const router = require('../routes/doctor');


const doctorSchema = new mongoose.Schema({
    fullname:{type:String},
    username:{type:String},
    address:{type:String},
    phone:{type:String},
    email:{
        type:String,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    gender:{
        type: String,
        enum: ['Male','Female','Others'],
        default: 'Male'

    },
    usertype:{
        type: String,
        enum: ['Patient','Doctor'],
        default: 'Doctor'
    },
    password:{type:String},
    profile_pic:{type:String, default: "asdf"}
})

const doctor= mongoose.model('Doctor',doctorSchema) //customers table

module.exports=doctor 