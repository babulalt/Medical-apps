const express =require("express");

const router = new express.Router();
const auth =require("../middleware/auth");
const Appointment = require("../models/appointment");


router.post('/appointment/insert',auth.verifypatient, async function(req,res){
  
     const userid = req.userData._id;
     const name = req.body.name;
     const speciality = req.body.speciality;
     const purpose = req.body.purpose;
     const doctor = req.body.doctor;
     const phone = req.body.phone;
     const date = req.body.date;
    console.log(name)
     
    const appointment = new Appointment({
      
      userid: userid,
      name: name,
      speciality: speciality,
      purpose: purpose,
      doctor: doctor,
      phone: phone,
      date:date,
      });
      appointment.save()
      .then(function (data) {
        res.status(201).json( {data: data,success: true});
        console.log("applied");
        console.log(userid)
      })
      .catch(function (err) {
        res.status(500).json({ message: err });
      });
  
})

router.put('/appointment/update',async function(req,res){
  try{
    const updateAppointment=await Appointment.updateOne(
      {_id:req.body.id},
      {doctor:req.body.doctor,
        name: req.body.name,
        purpose: req.body.purpose,
        phone: req.body.phone,
        speciality: req.body.speciality,
        date: req.body.date,
        status: req.body.status
      }
    )
    res.json({
      message:"succesfully updated",
      data:updateAppointment,
      success:true
    })
    console.log(updateAppointment)

  }
  catch(e){
    res.json({
      message:"error"+e
    })
    console.log(e)

  }
})

router.delete('/appointment/delete/:id',async function(req,res){
  try{
    const deleteAppointment=await Appointment.deleteOne(
      {_id:req.params.id},
//         {doctor:req.body.doctor,
//         name: req.body.name,
//         purpose: req.body.purpose,
//         phone: req.body.phone,
//         speciality: req.body.speciality,
//         date: req.body.date
// }
    )
    res.json({
      message:"succesfully deleted",
      data:deleteAppointment,
      success:true
    })
    console.log(deleteAppointment)

  }
  catch(e){
    res.json({
      message:"error"+e
    })
    console.log(e)

  }
})
 

router.get('/appointment/show', function(req,res){
  

 Appointment.find()
 //.populate() 
  .then(function(data){
    res.status(200).json({data, success: true});
    console.log(data)
  })
 
  .catch(function(err){
    res.status(500).json({message: err})
  })
})



router.get('/appointments',auth.verifypatient,async function(req,res){
  
  // const workid = req.params.id;
  const userid = req.userData;
   console.log("sssssss"+userid._id)
  Appointment
    .find({
      userid:userid
    })
    .then(function (data) {
      res.status(200).json({data, success: true});
      console.log(data)
    })
    .catch(function (e) {
      res.status(500).json({ message: e });
    });
})
module.exports = router;




router.get('/appointment/showone/:id', function(req,res){
  
  
  const id = req.params.id;
  
  Appointment.findById(id) 
   .then(function(data){
     res.status(200).json(
      { data:data}
       );
       console.log("data aayo"+data)
   })
   .catch(function(err){
     res.status(500).json({message: err})
   })
 })