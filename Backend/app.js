const express= require("express");
const cors=require("cors")
 
require("./dbconnection/db");
const bodyParser=require("body-parser");
 
const app= express();
app.use(cors());
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

    

app.use('/medicinePic',express.static(__dirname+'/medicinePic'));


 
// const patient= require("./routes/patient");
const doctor= require("./routes/doctor");
const medicine = require("./routes/medicine");
const appointment = require("./routes/appointment");
// const uploadFile = require("./middleware/uploadFile")

// app.use(patient);
app.use(doctor);
app.use(medicine);
app.use(appointment);
// app.use(uploadFile)
 
app.listen(90);