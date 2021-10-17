const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name = {
        type: String,
        maxLength: 50
    },
    email = {
        type: email,
        trim: true,
        unique: 1
    },
    password = {
        type: String,
        maxLength: 15
    },
    role = {
        type: Number,
        default: 0
    },
    image: String,
    token: String,
    tokenExp: Number
})

const User = mongoose.model('User', userSchema)
module.exports = { User }
