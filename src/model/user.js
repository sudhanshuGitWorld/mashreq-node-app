const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { Schema, model } = mongoose;
const { isEmail, isStrongPassword } = validator;

const userSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!isEmail(value)) throw new Error('Email id format is not valid');
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!isStrongPassword(value)) throw new Error('Please enter strong password');
        }
    },
    confirmPassword: {
        type: String,
        validate(value) {
            if (!isStrongPassword(value)) throw new Error('Confirm password must be same as password !!');
        }
    }
},
{
    timestamps: true
});

userSchema.methods.getJWT = async function() {
    const user = this;
    const token = await jwt.sign(
        { _id: user._id},
        'ACCESS_TOKEN_KEY',
        { expiresIn: '5m' }
    );
    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {

    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser,
        passwordHash
    );

    if (!isPasswordValid) throw new Error('Invalid credentials')
    else return isPasswordValid;
}

const UserModel = model('user', userSchema);

module.exports = UserModel;
