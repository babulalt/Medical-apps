// use the path of your model

const Appointment = require('../Models/appointment');
// const User= require("../Models/user")

const mongoose = require('mongoose');

// use the new name of the database

const url = 'mongodb://localhost:27017/appointment_test';

beforeAll(async () => {

    await mongoose.connect(url, {

        useNewUrlParser: true,

        useCreateIndex: true

    });

});



afterAll(async () => {

    await mongoose.connection.close();

});



describe('appointment Schema testing ', () => {

    // the code below is for insert testing jobs

    it('Add job testing anything', () => {

        const appointment = {
           
            "name":"subodh",
            "purpose":"General",
            "doctor":"DR rajiv",
            "gender":"Male",
            "date": "20205", 
            "phone": "325566" ,
        
            "speciality": "cardio"
            

        };
        return Appointment.create(appointment)

            .then((pro_ret) => {

                expect(pro_ret.name).toEqual('subodh');
                expect(pro_ret.purpose).toEqual("General");

            });

    });

//    





    // the code below is for delete testing

    it('to test the delete product', async () => {

        const status = await Appointment.deleteMany();

        expect(status.ok).toBe(1);

    });



    // update testing
    it('to appointment the update', async () => {

        return Appointment.findOneAndUpdate({ _id: Object('6150955b0651565d3868ccd7') },

            { $set: { name: "Ram" } })

            .then((pp) => {

                expect(pp.name).toEqual("subodh")

            })

    });
})
