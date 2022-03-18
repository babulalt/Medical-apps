const express = require('express');
const doctorModel = require('../models/doctor');
const upload = require('../middleware/uploadFile')
const bcrypt= require("bcryptjs");
const router = new express.Router()
const jwt=require("jsonwebtoken")

router.post('/doctor/register',function(req,res){
    console.log(req.body)       
    const username = req.body.username;
    const fullname = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const usertype=req.body.usertype;
    // const gender=req.body.gender;
    // const profile_pic=req.file.filename

    bcrypt.hash(password, 10, function(err, hash){

        const doctordata = new doctorModel({username : username, password : hash, email : email , usertype:usertype,fullname:fullname
       
        });

            doctordata.save()
            .then(function(){
                    res.status(201).json({message : "Registration successful!",success:true,data:doctordata})
                    console.log("register vayoooo ")
            })
            .catch(function(err){
                console.log(err)
                res.send(err)
                    res.status().json({message : err})
            });   
    });

})

router.put('/doctor/update', function(req,res){
    const id = req.body._id;
    const username =req.body.username;
    const gender =req.body.gender;
    const email = req.body.email;
    const phone = req.body.phone;
    console.log(req.body)
    doctorModel.updateOne ({_id: id},
        {username:username,gender:gender, email:email,phone:phone})
    
    
    .then(function(result){
        console.log(result)
         res.status(201).json({message: "Profile pic updated", success: true})
    })
        
    .catch(function(err){
        console.log(err)
        res.status(500).json({message: err})

    });

})


router.post('/doctor/login', function(req,res){
    console.log(req.body)
    const username = req.body.username; //checking username
    const password = req.body.password;

doctorModel.findOne({username : username})
.then(function(doctorData){
    if(doctorData===null){
        return res.status(403).json({message: "Invalid credential"})
    }

    console.log("login vayooo")
    bcrypt.compare(password, doctorData.password, function(err,result){
        if(result===false){
            return res.status(403).json({message: "invalid credential"}) //password wrong
        }
        const token = jwt.sign({userId: doctorData._id},'anysecretkey');
        res.status(200).json({token1: token, usertype: doctorData.usertype,
            data:doctorData, message: "Auth Sucesss",success:true})
            console.log(token)
  
    
    })

})
.catch(function(e){
    console.log(e)
})

}) 

router.get('/doctor/show', function(req,res){
  
  
    doctorModel.find() 
     .then(function(data){
       res.status(200).json(
        { data:data}
         );
     })
     .catch(function(err){
       res.status(500).json({message: err})
     })
   })

   router.get('/doctor/showone/:id', function(req,res){
    const id = req.params.id;
    
    doctorModel.findById(id) 
     .then(function(data){
       res.status(200).json(
        { data:data, success:true}
         );
        //  console.log("data aayo"+data)
     })
     .catch(function(err){
       res.status(500).json({message: err})
     })
   })

router.post("/profile/upload",upload.single("myimage"),function(req,res){ 
 
    // database mah halna ko lagi 
    console.log(req.file)        //req.file == filename ,destination, mimetype,size
    const data = new doctorModel({
        profile_pic: req.file.filename
    })
    console.log(data) 
    data.save()
    .then(function(data){
        res.json({message:"uploaded image"})
 
    })
    .catch(function(){
 
    })
    


 
});


module.exports=router
