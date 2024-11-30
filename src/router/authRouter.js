const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');

const UserModel = require('../model/user')
const { validateSignUpData } = require('../utils/validation');

authRouter.post('/signup', async (req, res) => {
    const saltRounds = 10;
    const { email, password } = req.body;
    try {
        // validation of Signup Api
        validateSignUpData(req.body);

        // encrypt password
        const passwordHash = await bcrypt.hash(password, saltRounds)

        // save sanitized data
        const data = new UserModel({
            email, password: passwordHash
        });
        await data.save();
        res.send('User added successfully');
    } catch (err) {
        res.status(400).send('Error while saving the user ' + err.message);
    }
})

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const user = await UserModel.findOne({ email: email });
        if (!user) throw new Error('Invalid credentials');
   
        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {
            const token = await user.getJWT();
            
            res.cookie('token', token, {
                expires: new Date(Date.now() + 900000), httpOnly: true
            });
            res.json({
                message: 'User logged in successfully',
                status: 200,
                data: user
            })
        }
    } catch (error) {
        res.status(400).json({
            message: error.message,
            status: 400,
            data: {}
        });
    }
})

authRouter.post('/logout', async (req, res) => {
    res.cookie(
        'token',
        null, 
        { expires: new Date(Date.now())}
    ).send('User has been logged out successfully !!');
})


module.exports = authRouter;
