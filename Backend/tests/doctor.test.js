// use the path of your model

//const Job = require('../Models/jobModels');
const User= require("../Models/doctor")

const mongoose = require('mongoose');

// use the new name of the database

const url = 'mongodb://localhost:27017/user_test';

beforeAll(async () => {

    await mongoose.connect(url, {

        useNewUrlParser: true,

        useCreateIndex: true

    });

});



afterAll(async () => {

    await mongoose.connection.close();

});



describe('user Schema testing ', () => {

    // the code below is for insert testing jobs

   
    it('Add user testing anything', () => {

        const user = {

            "username": "roshan",
            "password": "123",
            "email": "rajivkarky@gmail.com",
            
            "usertype": "Doctor"
            

            

        };



        return User.create(user)

            .then((pro_ret) => {

                expect(pro_ret.username).toEqual('roshan');
                expect(pro_ret.password).toEqual('123');

            });

    });





    // the code below is for delete testing

    it('to test the delete user', async () => {

        const status = await User.deleteMany();

        expect(status.ok).toBe(1);

    });



    //this is to update userss

    it('to user the update', async () => {

        return User.findOneAndUpdate({ _id: Object('615097a3011100557478c9b5') },

            { $set: { username: 'Subodhshah' } })

            .then((pp) => {

                expect(pp.username).toEqual('roshan')

            })
            



    });



})