const jwt = require('jsonwebtoken');
// const patients = require('../models/patient');
const doctors = require('../models/doctor')
    

module.exports.verifypatient = function(req,res, next){

    try{
        const token = req.headers.authorization.split(" ")[1];
        console.log(req.headers)
        const  data = jwt.verify(token, 'anysecretkey');       
    
        doctors.findOne({_id : data.userId})
        .then(function(result){
            console.log(result)
            if(result){
                if(result.usertype==="Patient")
                req.userData= result;
                console.log(req.userData._id)
                next()
            }
         
        })
        .catch(function(err){
            res.status(401).json({error: err})
        })
    }
    catch(e){
        res.status(401).json({error : e})
    }

}

module.exports.verifydoctor = function(req,res, next){

    try{
        const token = req.headers.authorization.split(" ")[1];
        const  data = jwt.verify(token, 'anysecretkey');       
    
        doctors.findOne({_id : data.userId})
        
        .then(function(result){
            if(result){
                if(result.usertype==="Doctor")
                req.userData = result;
                console.log(result.token)
                next()
            }
        })
        .catch(function(err){
            res.status(401).json({error: err})
        })
    }
    catch(e){
        res.status(401).json({error :'ERROR AAYO '+ e})
    }

}