const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.register = async(name, email, password, age) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const user = new UserModel({ name, email, password: hash, age });
    await user.save();
    return user;
}

exports.checkUserExits = async(email) => {
    const user = await UserModel.findOne({ email });
    return user ? user : null;
}

exports.login = async(email, password) => {
    const user = await UserModel.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
        return user;
    }
    return null;
}
exports.getAll = async() => {
    const users = await UserModel.find({})
    return users;
}

exports.forgotPassword = async (email) =>{
    const user = await UserModel.findOne({email});
    if(user) {
        const token = jwt.sign({ id: user._id }, 'shhhhh', { expiresIn: 5*60 });
        user.token_reset_password = token;
        await user.save();
        return token;
    }
    return null;
}

exports.resetPassword = async (token, password) =>{
    const user = await UserModel.findOne({token_reset_password: token});
    if(user) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        user.password = hash;
        user.token_reset_password = null;
        await user.save();
        return true;
        }
        return false;
}