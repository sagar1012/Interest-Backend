var mongoose = require('mongoose');

var Interest = new mongoose.Schema({
    fullName: {
        type: String
    },
    email: {
        type: String
    },
    gender: {
        type: String
    },
    interest: {
        type: Array
    }
}, { timestamps: true });

var Interest = mongoose.model('interest', Interest);

module.exports = {
    Interest: Interest
}