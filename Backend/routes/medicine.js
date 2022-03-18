const express =require("express");
const Medicine = require("../models/medicine");

const router = new express.Router();
const auth =require("../middleware/auth")


router.post('/medicine/insert',auth.verifypatient, async function(req,res){
  console.log(req.body)
 
 


  const medicinename = req.body.medicinename;
  const price = req.body.price;
  const quantity = req.body.quantity;
  const expdate = req.body.expdate;
 
  try{

    
    const medicine =  new Medicine({userid:req.userData._id,medicinename:medicinename,
    price:price, expdate: expdate,quantity:quantity});
    const result = await medicine.save()
    console.log(result)
    console.log("inserted ho")

    res.json({
      message:"succesfully inserted",
      data:medicine,
      success:true
    })

  }
  catch(e){
    res.json({
      message:"errpror"+e

    })
  
    console.log(e)

  }
 

})

router.put('/Medicine/update',async function(req,res){
  try{
    const updateMedicine=await Medicine.updateOne(
      {_id:req.body.id},
      {medicinename:req.body.medicinename,
      quantity:req.body.quantity,
      price:req.body.price}
    )
    res.json({
      message:"succesfully updated",
      data:updateMedicine,
      success:true
    })
    console.log(updateMedicine)

  }
  catch(e){
    res.json({
      message:"error"+e
    })
    console.log(e)

  }
})

router.delete('/Medicine/delete/:id',async function(req,res){
  try{
    const deleteMedicine=await Medicine.deleteOne(
      {_id:req.params.id}
     
    )
    res.json({
      message:"succesfully deleted",
      data:deleteMedicine,
      success:true
    })
    console.log(deleteMedicine)

  }
  catch(e){
    res.json({
      message:"error"+e
    })
    console.log(e)

  }
})
 

router.get('/Medicine/show', function(req,res){
  
  
 Medicine.find() 
  .then(function(data){
    res.status(200).json(
     { data:data, success:true}
      );
      console.log("medicine show vayo")
      
  })
  .catch(function(err){
    res.status(500).json({message: err})
  })
})





router.get('/Medicine/showone',auth.verifypatient ,function(req,res){
  
  const id = req.userData._id;
  
  Medicine.find({userid:id}) 
   .then(function(data){
     res.status(200).json(
      { data:data,success:true}
       );
       console.log("data aayo"+data)
   })
   .catch(function(err){
     res.status(500).json({message: err})
   })
 })

module.exports = router;