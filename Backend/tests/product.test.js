// use the path of your model

const Medicine = require('../Models/medicine');
// const User= require("../Models/user")

const mongoose = require('mongoose');


// use the new name of the database

const url = 'mongodb://localhost:27017/medicine_test';

beforeAll(async () => {

    await mongoose.connect(url, {

        useNewUrlParser: true,

        useCreateIndex: true

    });

});



afterAll(async () => {

    await mongoose.connection.close();

});



describe('medicine Schema testing ', () => {

//     // the code below is for insert testing jobs

    it('Add job testing anything', () => {

        const medicine = {
           
            "medicinename":"paracet",
            "price":322,
            "quantity":222,
            

            

        };
        return Medicine.create(medicine)

            .then((pro_ret) => {

                expect(pro_ret.medicinename).toEqual('paracet');
                expect(pro_ret.price).toEqual(322);

            });

    });

//    





    // // the code below is for delete testing

    it('to test the delete product', async () => {

        const status = await Medicine.deleteMany();

        expect(status.ok).toBe(1);

    });



    //update testing
    it('to medicine the update', async () => {

        return Medicine.findOneAndUpdate({ _id: Object('61509871d0a4ee29903eff54') },

            { $set: { price: 3222 } })

            .then((pp) => {

                expect(pp.price).toEqual(8000)

            })

    });
})
