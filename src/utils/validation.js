const bcrypt = require('bcrypt');

const compareTwoString = (str1, str2) => str1 === str2;

const validateSignUpData = (signupData) => {
    const { email, password, confirmPassword } = signupData;

    if (!email) throw new Error('Email id should not be empty')
    if (!password) throw new Error('Password should not be empty')
    if (password !== confirmPassword) throw new Error('Confirm password must be same as password !!')
}

module.exports = {
    validateSignUpData,
};
