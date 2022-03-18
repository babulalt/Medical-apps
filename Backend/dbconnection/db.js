const mongoose = require('mongoose');

// connection with db called softwarica

mongoose.connect('mongodb://127.0.0.1:27017/MedicalServices',{

    useNewUrlParser:true,

    useCreateIndex:true,

    useUnifiedTopology:true

})